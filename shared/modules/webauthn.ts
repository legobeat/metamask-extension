import { Duplex } from 'stream';
import { StreamProviderOptions } from '@metamask/providers/dist/StreamProvider';
//import { BaseProviderOptions } from '@metamask/providers/dist/BaseProvider';

export interface InitializeWebAuthnProviderOptions extends Partial<Omit<StreamProviderOptions, 'rpcMiddleware'>> {
    /**
     * The stream used to connect to the wallet.
     */
    connectionStream: Duplex;
    /**
     * Whether the provider should be set as window.credentials.
     */
    shouldSetOnWindow?: boolean;
}

export const initializeWebAuthnProvider = ({ connectionStream, logger }: InitializeWebAuthnProviderOptions) => {
  const log = logger || ((x: any) => console.error(x));
  log('HELLO WEBAUTHN');
  alert('HELLO WEBAUTHN');
};
