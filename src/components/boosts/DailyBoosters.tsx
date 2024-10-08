import {useDispatch, useSelector} from "react-redux";
import {dailyBoosterData, userDailyBoost} from "../../types/data.ts";
import {showBottomSheet} from "../../store/game.ts";
import {ImageSliceType, PurchaseSliceType} from "../../types/store.ts";
import {showToast} from "../../helpers/helper.ts";

const DailyBoosters = () => {
    const boosts = useSelector((state: any) => state.boost);
    const images: ImageSliceType = useSelector((state: any) => state.image);
    const purchase: PurchaseSliceType = useSelector((state: any) => state.purchase);
    const dispatch = useDispatch();
    const dailyBoosts: dailyBoosterData[] = boosts.dailyBoosts;
    const leftDailyBoosts: userDailyBoost[] = boosts.leftDailyBoosts;
    const buyBooster = async (id: string) => {
        const item = dailyBoosts.filter((b: any) => id === b.id)[0];
        const leftB = item.limit - ((leftDailyBoosts.filter((b: any) => b.id === item.id)[0]).used);
        if (leftB > 0) {
            dispatch(showBottomSheet({item: item, type: 'daily_booster'}))
        } else {
            showToast(purchase.toast,'You have used all your free booster', 'error')
        }
    };
    
    return (
        <div className=''>
            <p className='boost-title animate__animated animate__fadeIn animate__slow'>Free Daily Boosters</p>
            <div className='daily-boosters glass blur-round-border-bg animate__animated animate__fadeIn animate__slow'>
                {
                    dailyBoosts.map((boost) => {
                        const leftB = boost.limit - ((leftDailyBoosts.filter((b: any) => b.id === boost.id)[0]).used);
                        const dailyImg = images.dailyBooster.find((img: any) => img.name == boost.image);
                        const img = dailyImg ? dailyImg?.img : null;
                        return (
                            <div className='single-booster glass-hover' key={boost.id}
                                 onClick={() => buyBooster(boost.id)}>
                                <div>
                                    {img && img.big ? <img src={img.big.src}/> : null}
                                </div>
                                <div>
                                    <p>{leftB}/<span className='daily-boost-limit'>{boost.limit}</span></p>
                                    <p>{boost.name}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default DailyBoosters;
