import React, { useEffect, useState } from "react";
import { UserProvider } from "../UserContext";
import { Boost } from "./Boost/Boost";
import { Earn } from "./Earn/Earn";
import { Auth } from "./Forms/Auth/Auth";
import { Reg } from "./Forms/Reg/Reg";
import { Buttons } from "./General/Buttons/Buttons";
import { General } from "./General/General";
import styles from './General/General.module.css';

export function App() {

    const [maxEnergy, setMaxEnergy] = useState(2000);
    const [energy, setEnergy] = useState(maxEnergy);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    const [menu, setMenu] = useState({
        auth: true,
        reg: false,
        home: false,
        mine: false,
        boost: false,
        earn: false,
        buttons: false,
    });

    return (
        <React.StrictMode>
            <UserProvider>
                {loading ?
                    <div className={styles.loading} >
                        <h1 className={styles.loading__title}>ReactMakimaCoin</h1>
                        <div className={styles.loading__text}>loading...</div>
                    </div> :
                    <>
                        {menu.auth && <Auth setMenu={setMenu} />}
                        {menu.reg && <Reg setMenu={setMenu} />}
                        <General maxEnergy={maxEnergy} setMaxEnergy={setMaxEnergy} energy={energy} setEnergy={setEnergy} style={{ display: menu.home ? 'flex' : 'none' }} menu={menu} setMenu={setMenu} />
                        <Boost setMaxEnergy={setMaxEnergy} style={{ display: menu?.boost ? 'flex' : 'none' }} />
                        <Earn style={{ display: menu?.earn ? 'flex' : 'none' }} />
                        <Buttons style={{ display: menu?.buttons ? 'flex' : 'none' }} menu={menu} setMenu={setMenu} />
                    </>
                }
            </UserProvider>
        </React.StrictMode>
    )
}

