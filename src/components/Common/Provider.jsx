import React from 'react'
import no_img_provider from 'images/default/default_provider.png'
import Image from './Image'

const Provider = ({ styles = '', imgStyles = '', imgProps = {}, provideStyles = '', providedByStyles = '', nameStyles = '', provider, defineLang }) =>
  provider && (
    <div className={`w3-row ${styles}`}>
      <div className={`w3-col w-16 h-16 rounded-circle useBorder border-0-05 overflow-hidden ${imgStyles}`}>
        <Image imageUrl={provider.imageUrl} backupImg={no_img_provider} {...imgProps} />
      </div>
      <div className={`w3-col ml-8px w-fit ${provideStyles}`}>
        <div className={`h-18px leading-18px text-13px color-0-5 ${providedByStyles}`}>{defineLang('Cung cấp bởi:', 'Provided by:')}</div>
        <div className={`mt-2 text-sm font-bold text-main uppercase truncate ${nameStyles}`} title={provider.name}>
          {provider.name}
        </div>
      </div>
    </div>
  )

export default Provider
