import React, { PropsWithChildren, useContext } from 'react';
import TIM from '../@types';
import { IMessage } from '../components';
import type {
  CreateFaceMessageProps,
  CreateForwardMessageProps,
  CreateTextMessageProps,
  CreateUploadMessageProps,
} from '../components/TUIChat/hooks/useCreateMessage';
import { OperateMessageParams } from '../components/TUIChat/hooks/useHandleMessage';

export interface TUIChatActionContextValue {
  sendMessage?: (message: IMessage) => Promise<void>,
  removeMessage?: (message: IMessage) => void,
  updateMessage?: (messages: Array<IMessage>) => void,
  createTextMessage?: (options: CreateTextMessageProps) => IMessage,
  createFaceMessage?: (options: CreateFaceMessageProps) => IMessage,
  createImageMessage?: (options: CreateUploadMessageProps) => IMessage,
  createVideoMessage?: (options: CreateUploadMessageProps) => IMessage,
  createFileMessage?: (options: CreateUploadMessageProps) => IMessage,
  createForwardMessage?: (options: CreateForwardMessageProps) => IMessage,
  editLocalmessage?: (message: IMessage) => void,
  operateMessage?: (data?: OperateMessageParams) => void,
  loadMore?: () => Promise<void>,
  revokeMessage?: (message:IMessage) => Promise<TIM>,
}

export const TUIChatActionContext = React.createContext<
TUIChatActionContextValue | undefined>(
  undefined,
);

export function TUIChatActionProvider({
  children,
  value,
}: PropsWithChildren<{
  value: TUIChatActionContextValue
}>):React.ReactElement {
  return (
    <TUIChatActionContext.Provider
      value={(value as unknown) as TUIChatActionContextValue}
    >
      {children}
    </TUIChatActionContext.Provider>
  );
}

export const useTUIChatActionContext = (
  componentName?: string,
) => {
  const contextValue = useContext(TUIChatActionContext);

  if (!contextValue) {
    return {} as TUIChatActionContextValue;
  }

  return (contextValue as unknown) as TUIChatActionContextValue;
};
