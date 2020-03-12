import style from './index.css'
import React, {memo, useEffect, useRef, useState} from 'react'
import {Mask, Toast} from './components'
import {padValue} from "../../../utils/tool";


const mock_robPoints = [
    {
        rank: '20+',
        name: 'wwt',
        point: 9999
    },
    {
        rank: 1,
        name: 'wwt',
        point: 9999
    },
    {
        rank: 1,
        name: 'wwt',
        point: 9999
    },
    {
        rank: 1,
        name: 'wwt',
        point: 9999
    },
    {
        rank: 1,
        name: 'wwt',
        point: 9999
    },
]

const master_box_status = ['抢分赛将于14：00开启','抢分赛进行中，积分TOP1主播将成为擂主']

const roundTime1 = (new Date()).setHours(14,0,0,0)
const roundTime2 = (new Date()).setHours(17,0,0,0)
const roundTime3 = (new Date()).setHours(20,0,0,0)
const roundTime4 = (new Date()).setHours(23,0,0,0)

const hour = 1 * 60 * 60 *1000

const Main = () => {
    const [rankStatus, setRankStatus] = useState('single')
    const [mask, setMask] = useState('')
    const [robPointStart,setRobPointsStart] = useState(false)
    const [ringStart,setRingStart] = useState(false)
    const [nowTime,setNowTime] = useState(Date.now())
    const [countTime,setCountTime ] = useState('00:00')

    useEffect(()=>{
        // console.log('14:00',(new Date()).setHours(14,0,0,0))
        // let timer = setInterval(()=>{
        //     setNowTime(Date.now())
        //     // console.log('ss',Date.now())
        // },1000)
        // return ()=>{
        //     clearInterval(timer)
        // }
        if(nowTime>roundTime1){
            setRobPointsStart(true)
        }
        if(nowTime>roundTime1 + hour && nowTime < roundTime2){
            setRingStart(true)
            console.log('2')
        }
        if(nowTime>roundTime2 + hour && nowTime < roundTime3){
            console.log('3')
            setRingStart(true)
        }
        if(nowTime>roundTime3 + hour && nowTime < roundTime4) {
            setRingStart(true)
        }
        if(nowTime>roundTime4 + hour){
            setRingStart(true)
        }
    },[])


    const renderCountTime = () => {
        const [ time,setTime] = useState({minute:'00',second:'00'})
        useEffect(()=>{
            let timer = setInterval(()=>{
                setNowTime(Date.now())
                let diffTime =  nowTime - roundTime1
                setTime({
                    minute: padValue(parseInt((diffTime / 1000 / 60) % 60)),
                    second: padValue(parseInt((diffTime / 1000) % 60))
                })
            },1000)
            return ()=>{
                clearInterval(timer)
            }
        },[time])

        return (
            <span className={style.robPoints_countDown}>倒计时：<div className={style.robPoints_countDown_time}>{time.minute+ '：'+time.second}</div></span>
        )
    }


    const renderList = () => {
        return (
            <div className={style.robPoints_list}>
                {
                    mock_robPoints.map(item => {
                        return (
                            <div className={style.robPoints_list_item_wrapper}>
                                <div className={style.robPoints_list_item}>
                                    <span className={style.anchor_rank}>NO.{item.rank}</span>
                                    <div className={style.anchor_avatar}></div>
                                    <span className={`${style.anchor_name} ellipsis`}>{item.name}</span>
                                    <span className={style.anchor_points}>{item.point}</span>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }

    return (
        <>
            <div className={style.scroll}>
                <div className={style.head}></div>
                <div className={style.master}>
                    <div className={style.master_box_header}></div>
                    <div className={style.master_box}>
                        <div className={style.master_rule}>每停留1分钟得10擂主分</div>
                        {
                            robPointStart &&
                            (
                                <>
                                    <div className={style.master_avatar}></div>
                                    <div className={style.master_name}>一条小团团OvO</div>
                                    <div className={style.master_score}>887888分</div>
                                </>
                            )
                        }
                        {
                            !robPointStart && <div className={style.begin_text}>抢分赛将于14：00开启</div>
                        }
                    </div>
                </div>
                <div className={style.robPoints}>
                    <div className={ringStart?style.ring_header:style.robPoints_header}></div>
                    {renderCountTime()}
                    <span className={style.robPoints_rule}>积分TOP1主播将成为擂主</span>
                    <div className={style.robPoints_splitLine}></div>
                    <div className={style.list_header}>
                        <span>排名</span>
                        <span className={style.anchor}>主播</span>
                        <span className={style.blank}></span>
                        <span>积分</span>
                    </div>
                    { robPointStart && renderList()}
                    { !robPointStart && <div className={style.begin_text}>抢分赛将于14：00开启</div>}
                </div>

                <div className={style.ringRank}>
                    <span className={style.ringRank_rule}>擂主日榜TOP3主播获得礼券奖励</span>
                    <div className={style.robPoints_splitLine}></div>
                    <div className={style.list_header}>
                        <span>排名</span>
                        <span className={style.anchor}>主播</span>
                        <span className={style.blank}></span>
                        <span>擂主分</span>
                    </div>
                    <div
                        className={`${rankStatus === 'single' ? style.ringRank_header_single_active : ''} ${style.ringRank_header_single}`}
                        onClick={() => setRankStatus('single')}
                    ></div>
                    <div
                        className={`${rankStatus === 'all' ? style.ringRank_header_all_active : ''} ${style.ringRank_header_all}`}
                        onClick={() => setRankStatus('all')}
                    ></div>
                    { ringStart && renderList()}
                    { !ringStart && <div className={style.begin_text}>暂无数据</div>}
                </div>

                <div
                    className={style.rule_btn}
                    onClick={() => setMask(0)}
                ></div>
            </div>

            <Mask mask={mask} setMask={setMask}>
                <div className={style.mask_wrapper}>
                    <div className={style.rule_time_box}>活动时间：3月20日-24日(每日14:00-02:00)</div>
                    <div className={style.rule_box}>
                        <div className={style.rule_header}>活动规则</div>
                        <div className={style.rule_content}>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>1</div>
                                <div
                                    className={style.rule_text}> <span>每天分为四个轮次，每3小时一个轮次</span>(14:00-17:00、17:00-20:00、20:00-23:00、23:00-02:00)
                                </div>
                            </div>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>2</div>
                                <div
                                    className={style.rule_text}> 每轮次各有两个阶段：<span>抢分赛和擂台争霸，前一个小时是抢分赛，后两个小时是擂台争霸</span>
                                </div>
                            </div>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>3</div>
                                <div
                                    className={style.rule_text}>主播通过守擂台和擂台争霸可获得擂主分，最后<span>根据总擂台分决出主播总排名</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.rule_box}>
                        <div className={style.rule_header}>抢分赛</div>
                        <div className={style.rule_content}>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>1</div>
                                <div
                                    className={style.rule_text}>抢分赛时间为每天14:00-15:00、17:00-18:00、20:00-21:00、23:00-24:00
                                </div>
                            </div>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>2</div>
                                <div
                                    className={style.rule_text}> 在抢分赛的一个小时内，主播<span>根据获得积分进行排名</span>，本阶段结束后，<span>第1名主播将成为擂主</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.rule_box}>
                        <div className={style.rule_header}>擂台争霸</div>
                        <div className={style.rule_content}>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>1</div>
                                <div
                                    className={style.rule_text}>抢擂台时间为抢分赛之后的两个小时，即每天15:00-17:00、18:00-20:00、 21:00-23:00、00:00-02:00
                                </div>
                            </div>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>2</div>
                                <div
                                    className={style.rule_text}> 主播可向擂主发起挑战，<span>积分高于擂主的积分即为抢擂台成功，可成为新擂主</span>
                                </div>
                            </div>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>3</div>
                                <div
                                    className={style.rule_text}>主播<span>每在擂台停留1分钟，都可获得10擂主分</span>
                                </div>
                            </div>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>3</div>
                                <div
                                    className={style.rule_text}>擂台争霸挑战中，主播每获得5000积分，可额外增加5擂主分
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.rule_box}>
                        <div className={style.rule_header}>积分计算</div>
                        <div className={style.rule_content}>
                            <div className={style.rule_item}>
                                <div
                                    className={style.rule_text}>1钻礼物对应1分(适用于抢分赛和擂台争霸)，部分礼物有额外加成
                                </div>
                            </div>
                            <div className={style.score_table1}></div>
                        </div>
                    </div>
                    <div className={style.rule_box}>
                        <div className={style.rule_header}>活动奖励</div>
                        <div className={style.rule_content}>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>1</div>
                                <div
                                    className={style.rule_text}><span>擂主日榜TOP3名主播获得奖励</span>
                                </div>
                            </div>
                            <div className={style.score_table2}></div>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>2</div>
                                <div
                                    className={style.rule_text}><span>擂主总榜TOP6主播获得奖励</span>
                                </div>
                            </div>
                            <div className={style.score_table3}></div>
                        </div>
                    </div>
                    <div className={style.rule_box}>
                        <div className={style.rule_header}>注意事项</div>
                        <div className={style.rule_content}>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>1</div>
                                <div
                                    className={style.rule_text}>礼券奖励及资源奖励将于活动结束后10个工作日内发放
                                </div>
                            </div>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>2</div>
                                <div
                                    className={style.rule_text}>活动期间主播若存在挂机、长时间在直播间内未露脸参与比赛等违规行为，将按照违规处理，取消活动参赛资格或活动奖励发放
                                </div>
                            </div>
                            <div className={style.rule_item}>
                                <div className={style.rule_num}>3</div>
                                <div
                                    className={style.rule_text}>本活动规则由平台方指定
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Mask>

            <Toast/>
        </>
    )
}
export default Main
