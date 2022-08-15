import { strict as assert } from 'assert';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { ORIGIN_METAMASK } from '../../shared/constants/app';

const Ganache = require('../../test/e2e/ganache');

const ganacheServer = new Ganache();

const browserPolyfillMock = {
  runtime: {
    id: 'fake-extension-id',
    onInstalled: {
      addListener: () => undefined,
    },
    onMessageExternal: {
      addListener: () => undefined,
    },
    getPlatformInfo: async () => 'mac',
  },
};

let loggerMiddlewareMock;
const createLoggerMiddlewareMock = () => (req, res, next) => {
  if (loggerMiddlewareMock) {
    loggerMiddlewareMock.requests.push(req);
    next((cb) => {
      loggerMiddlewareMock.responses.push(res);
      cb();
    });
    return;
  }
  next();
};

const MetaMaskController = proxyquire('./metamask-controller', {
  './lib/createLoggerMiddleware': { default: createLoggerMiddlewareMock },
}).default;

describe('MetaMaskController', function () {
  let metamaskController;
  const sandbox = sinon.createSandbox();
  const noop = () => undefined;

  before(async function () {
    await ganacheServer.start();
  });

  beforeEach(function () {
    metamaskController = new MetaMaskController({
      showUserConfirmation: noop,
      encryptor: {
        encrypt(_, object) {
          this.object = object;
          return Promise.resolve('mock-encrypted');
        },
        decrypt() {
          return Promise.resolve(this.object);
        },
      },
      initLangCode: 'en_US',
      platform: {
        showTransactionNotification: () => undefined,
        getVersion: () => 'foo',
      },
      browser: browserPolyfillMock,
      infuraProjectId: 'foo',
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  after(async function () {
    await ganacheServer.quit();
  });

  describe('#addNewAccount', function () {
    it('two parallel calls with same accountCount give same result', async function () {
      await metamaskController.createNewVaultAndKeychain('test@123');
      const [addNewAccountResult1, addNewAccountResult2] = await Promise.all([
        metamaskController.addNewAccount(1),
        metamaskController.addNewAccount(1),
      ]);
      assert.deepEqual(
        Object.keys(addNewAccountResult1.identities),
        Object.keys(addNewAccountResult2.identities),
      );
    });

    it('two successive calls with same accountCount give same result', async function () {
      await metamaskController.createNewVaultAndKeychain('test@123');
      const [addNewAccountResult1, addNewAccountResult2] = await Promise.all([
        metamaskController.addNewAccount(1),
        Promise.resolve(1).then(() => metamaskController.addNewAccount(1)),
      ]);
      assert.deepEqual(
        Object.keys(addNewAccountResult1.identities),
        Object.keys(addNewAccountResult2.identities),
      );
    });

    it('two successive calls with different accountCount give different results', async function () {
      await metamaskController.createNewVaultAndKeychain('test@123');
      const addNewAccountResult1 = await metamaskController.addNewAccount(1);
      const addNewAccountResult2 = await metamaskController.addNewAccount(2);
      assert.notDeepEqual(addNewAccountResult1, addNewAccountResult2);
    });
  });

  describe('#importAccountWithStrategy', function () {
    it('two sequential calls with same strategy give same result', async function () {
      let keyrinControllerState1;
      let keyrinControllerState2;
      const importPrivkey =
        '4cfd3e90fc78b0f86bf7524722150bb8da9c60cd532564d7ff43f5716514f553';

      await metamaskController.createNewVaultAndKeychain('test@123');
      await Promise.all([
        metamaskController.importAccountWithStrategy('Private Key', [
          importPrivkey,
        ]),
        Promise.resolve(1).then(() => {
          keyrinControllerState1 = JSON.stringify(
            metamaskController.keyringController.memStore.getState(),
          );
          metamaskController.importAccountWithStrategy('Private Key', [
            importPrivkey,
          ]);
        }),
        Promise.resolve(2).then(() => {
          keyrinControllerState2 = JSON.stringify(
            metamaskController.keyringController.memStore.getState(),
          );
        }),
      ]);
      assert.deepEqual(keyrinControllerState1, keyrinControllerState2);
    });
  });

  describe('#updateTransactionSendFlowHistory', function () {
    it('two sequential calls with same history give same result', async function () {
      const recipientAddress = '0xc42edfcc21ed14dda456aa0756c153f7985d8813';

      await metamaskController.createNewVaultAndKeychain('test@123');
      const accounts = await metamaskController.keyringController.getAccounts();
      const txMeta = await metamaskController.getApi().addUnapprovedTransaction(
        {
          from: accounts[0],
          to: recipientAddress,
        },
        ORIGIN_METAMASK,
      );
      console.log('accounts', txMeta.id);
      const [transaction1, transaction2] = await Promise.all([
        metamaskController
          .getApi()
          .updateTransactionSendFlowHistory(txMeta.id, 2, ['foo1', 'foo2']),
        Promise.resolve(1).then(() =>
          metamaskController
            .getApi()
            .updateTransactionSendFlowHistory(txMeta.id, 2, ['foo1', 'foo2']),
        ),
      ]);
      assert.deepEqual(transaction1, transaction2);
    });
  });
});
