import React, { useEffect, useState } from 'react';
import { TUIKit } from '@tencentcloud/chat-uikit-react';
import '@tencentcloud/chat-uikit-react/dist/cjs/index.css';
import TIM, { TIMUploadPlugin } from '../@types';

import { genTestUserSig } from '../debug/GenerateTestUserSig'

const init = async () => {
  return new Promise((resolve, reject) => {
    const tim = TIM.create({ SDKAppID: genTestUserSig('xxxx').sdkAppID });
    tim?.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
    const onReady = () => { resolve(tim); };
    tim.on(TIM.EVENT.SDK_READY, onReady);
    tim.login({
      userID: 'xxxx',
      userSig: genTestUserSig('xxxx').userSig,
    });
  });
}

export default function SampleChat() {
  const [tim, setTim] = useState<TIM>();
  useEffect(() => {
    (async ()=>{
      const tim = await init()
      setTim(tim)
    })()
  }, [])

  return (
    <div style={{height: '100vh',width: '100vw'}}>
      <TUIKit tim={tim}></TUIKit>
    </div>
  );
}
