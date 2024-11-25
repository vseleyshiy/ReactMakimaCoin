import { UseUser } from '../../hooks/useUser';
import { Mine } from '../Mine/Mine';
import { Blocks } from './Blocks/Blocks';
import { Coin } from './Coin/Coin';
import { Energy } from './Energy/Energy';
import styles from './General.module.css';
import { Profile } from './Profile/Profile';
import { Progress } from './Progress/Progress';
import { Score } from './Score/Score';
import { IEnergy, Props } from './types';

export function General(props: Props & IEnergy) {

    const { id } = UseUser();

    const { menu, setMenu, style, maxEnergy, setMaxEnergy, energy, setEnergy } = props;

    return (
        <>
            {id != 0 && (
                <div className={styles.container} style={style}>
                    <div className={styles.appWrap}>
                        <Profile />
                        <Blocks />
                        <Score />
                        <Progress />
                        {menu?.mine && <Mine />}
                        <Coin energy={energy} setEnergy={setEnergy} />
                        <Energy maxEnergy={maxEnergy} setMaxEnergy={setMaxEnergy} energy={energy} setEnergy={setEnergy} setMenu={setMenu} />
                    </div>
                </div>
            )}
        </>
    )
}   