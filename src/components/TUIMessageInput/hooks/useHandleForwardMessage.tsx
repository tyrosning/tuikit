import { useCallback, useEffect, useState } from 'react';
import TIM from '../../../@types';
import { MESSAGE_OPERATE } from '../../../constants';
import {
  IConversationValue, useTUIChatActionContext, useTUIChatStateContext, useTUIKitContext,
} from '../../../context';
import { IMessage } from '../../TUIMessage';

export function useHandleForwardMessage(msg?:IMessage) {
  const {
    operateData,
  } = useTUIChatStateContext('TUIMessageInputDefault');

  const [conversationList, setConversationList] = useState([]);
  const { sendMessage, createForwardMessage } = useTUIChatActionContext('useHandleForwardMessage');
  const { tim } = useTUIKitContext('TUIChat');

  const message = msg || operateData[MESSAGE_OPERATE.FORWARD];

  const sendForwardMessage = (list:Array<IConversationValue>) => {
    list.map((item:IConversationValue) => {
      const forwardMessage = createForwardMessage({ conversation: item, message });
      sendMessage(forwardMessage);
      return item;
    });
  };

  useEffect(() => {
    (async () => {
      const res = await tim.getConversationList();
      setConversationList(res?.data?.conversationList.filter(
        (item) => item.type !== TIM.TYPES.CONV_SYSTEM,
      ));
    })();
  }, [tim]);

  return {
    message,
    conversationList,
    sendForwardMessage,
  };
}
