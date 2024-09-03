/* eslint-disable @typescript-eslint/no-explicit-any */
import { links } from 'apps'
import constants, { SPECTRE_RPC } from 'apps/constants'
import ModalCancelRace from 'features/ModalCancelRace'
import { ResultHorseModal } from 'features/Race/components'
import { useFocusTopScreen, useReloadCurrentPage, useToggle } from 'hooks'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom'
import { Footer, Header } from 'shared'
import { removeDataAtLocalStorage } from 'utils/helper'
import CommonLayoutStyled from './styled'

interface CommonLayoutProps {
  children: React.ElementType
}

function CommonLayout({ children }: CommonLayoutProps) {
  useFocusTopScreen()
  const [isModalResultHorseOpen, toggleIsModalResultHorseOpen] = useToggle(false)
  const [titleBalace, setTitleBalance] = useState<string>('')

  const transaction = localStorage.getItem('transaction') as any
  const messageSuccess = `Congratulation!
  You have successfully balance transfered.`
  const navigate = useNavigate()

  useEffect(() => {
    if ((window as any).chrome) {
      window.ethereum?.on('networkChanged', function (networkId: string) {
        if (networkId !== SPECTRE_RPC) {
          removeDataAtLocalStorage()
          useReloadCurrentPage()
          navigate(links.home.index())
        }
      })

      window.ethereum?.on('accountsChanged', async () => {
        if (localStorage?.getItem(constants.ACCESS_TOKEN_KEY) != 'null') {
          removeDataAtLocalStorage()
          useReloadCurrentPage()
          navigate(links.home.index())
        }
      })
    }
  })

  useEffect(() => {
    const jsonTransaction = JSON.parse(transaction)
    const handleWaitForTransaction = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        if (jsonTransaction && jsonTransaction !== null) {
          try {
            const waitTransaction = await provider.waitForTransaction(jsonTransaction.hash)
            if (waitTransaction) {
              toggleIsModalResultHorseOpen(true)
              setTitleBalance('success!')
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
    handleWaitForTransaction()
  })

  const handleOk = () => {
    localStorage.removeItem(constants.TRANSACTION)
    useReloadCurrentPage()
    toggleIsModalResultHorseOpen(false)
  }

  return (
    <CommonLayoutStyled>
      <div className='header-container position-fixed w-100'>
        <Header />
      </div>
      <div className='content-container'>{children}</div>
      <div className='footer-container'>
        <Footer />
      </div>
      <ModalCancelRace />
      {isModalResultHorseOpen && (
        <ResultHorseModal title={titleBalace} onOk={handleOk} message={messageSuccess} exchangeCoin={true} />
      )}

    </CommonLayoutStyled>
  )
}

export default CommonLayout
