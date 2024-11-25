import styles from './Main.module.css'
import { Coin } from './Coin/Coin'
import { Score } from './Score/Score'
import { Dispatch, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { Buttons } from './Buttons/Buttons'
import { Profile } from './Profile/Profile'
import { Blocks } from './Blocks/Blocks'
import { Progress } from './Progress/Progress'
import { Energy } from './Energy/Energy'
import { roles } from '../../database'
import { UseUser } from '../../hooks/useUser'
import { Cards } from '../Mine/Cards/Cards'

interface Props {
  width: number
  setWidth: Dispatch<SetStateAction<number>>
  boostRef: RefObject<HTMLDivElement>
  mainRef: RefObject<HTMLDivElement>
  earnRef: RefObject<HTMLDivElement>
}

export function Main(props: Props) {

  const [loading, setLoading] = useState(true);

  const { width, setWidth, boostRef, mainRef, earnRef } = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    }
  }, [])

  const barRef = useRef<HTMLDivElement>(null)

  const { lvl, setLvl, balance, setBalance, energy, setEnergy, maxEnergy, lvlClick, hourProfit } = UseUser()
  // Function for change width onclick button

  const getWidth = () => {
    if (!barRef.current) return;
    barRef.current.style.width = `${width}%`;
    if (balance >= Number(roles[lvl].for_up)) {
      setLvl?.(prev => prev + 1);
    }
  }


  // Add Balance and Energy on useEffect

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance?.(prev => prev + ((lvlClick * 5) + Math.floor(hourProfit / 60 / 15)));
    }, 3000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    let cut = (balance / roles[lvl].for_up) * 100;
    setWidth(cut);
  }, [balance])

  useEffect(() => {
    getWidth();
  }, [width])

  const [addEnergy, setAddEnergy] = useState(true);

  useEffect(() => {
    if (energy >= maxEnergy) {
      setAddEnergy(false);
    } else {
      setAddEnergy(true);
    }
  }, [energy])

  useEffect(() => {
    if (addEnergy) {
      const interval = setInterval(() => {
        setEnergy?.(prev => prev + 10);
      }, 3000)

      return () => clearInterval(interval);
    }
  }, [addEnergy])

  // .........................................

  const mineRef = useRef<HTMLUListElement>(null);

  return (
    <>
      {loading ? (<h1 className={styles.loading}>Makimacoin loading...</h1>) : (
        <div className={styles.container} ref={mainRef}>
          <div className={styles.appWrap}>
            <Profile />
            <Blocks />
            <Score balance={balance} />
            <Progress barRef={barRef} />
            <Cards setWidth={setWidth} mineRef={mineRef} />
            <Coin setWidth={setWidth} getWidth={getWidth} />
            <Energy boostRef={boostRef} mainRef={mainRef} />
            <Buttons boostRef={boostRef} mainRef={mainRef} mineRef={mineRef} earnRef={earnRef} />
          </div>
        </div>
      )
      }
    </>
  )
}
