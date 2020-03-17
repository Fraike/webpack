import style from './index.css'
import React, {useEffect, useState} from 'react'
import {Mask} from './components'
import {padValue} from "@/utils/tool";
import { goLive, goIndex} from "@/utils/goto";
import {useFetch} from "@/utils/userHook";

const today = new Date()

const roundTime1 = today.setHours(14, 0, 0, 0)
const roundTime2 = today.setHours(17, 0, 0, 0)
const roundTime3 = today.setHours(20, 0, 0, 0)
const roundTime4 = today.setHours(23, 0, 0, 0)

const hour = 1 * 60 * 60 * 1000

const Main = () => {
    const [rankStatus, setRankStatus] = useState('single')
    const [mask, setMask] = useState('')

    const [ isInStage, setIsinStage] = useState(false)
    const [ stage, setStage] = useState(0)

    const [nowTime, setNowTime] = useState(Date.now())
    const [endTime, setEndTime] = useState(null)
    const [ master, setMaster] = useState({})

    const [ robPointsRankList,setRobPointsRankList] = useState([])
    const [ ringRankSingleList,setRingRankSingleList] = useState([])
    const [ ringRankAllList,setRingRankAllList] = useState([])

    const handleGotoLive = (platform_id, source, uid, live, notjumpst) => {
        if (notjumpst || !serverData.inapp_info || serverData.isAnchor || platform_id === '0' || source === '0' || uid === '0') {
            return
        }
        const args = { uid, source, platform_id }
        // 直播间
        if (live === 1) {
            goLive(args)
        }
        else {
            goIndex(args)
        }
    }


    useEffect(() => {
        if( nowTime > roundTime1 && nowTime < roundTime1 + hour){
            setEndTime(roundTime1 + hour)
        }else if(nowTime > roundTime1 + hour && nowTime < roundTime2){
            setEndTime(roundTime2)
        }else if(nowTime > roundTime2 && nowTime < roundTime2 + hour){
            setEndTime(roundTime2 + hour)
        }else if(nowTime > roundTime2 + hour && nowTime < roundTime3){
            setEndTime(roundTime3)
        }else if(nowTime > roundTime3  && nowTime < roundTime3 + hour){
            setEndTime(roundTime3 + hour)
        }else if( nowTime > roundTime3 + hour && nowTime < roundTime4){
            setEndTime(roundTime4)
        }else if(nowTime > roundTime4 && nowTime < roundTime4 + hour){
            setEndTime(roundTime4 + hour)
        }else {
            setEndTime(roundTime4 + 3 * hour)
        }

    }, [])

    const fetchData = async () => {
        const res = await useFetch({
            url: '/v1/activity/rmxspringarenarank',
            method: 'GET',
            query: {
                mc_uid: serverData.anchor.mc_uid,
                mc_source: serverData.anchor.mc_source,
                source_id: serverData.anchor.mc_uid || 0,
                source: serverData.anchor.mc_source || 0,
                token: serverData.token || 0,
                ts: serverData.ts,
                sdk: serverData.sdk,
                app_ver: serverData.app_ver,
                sys: serverData.sys,
                app: serverData.app
            }
        })
        if (res.err === 0) {
            const {
                is_in_stage,
                stage,
                arena_winner,
                stage_rank,
                daily_rank,
                arenapoint_rank,
                mc_stage_rank_data,
                mc_daily_rank_data,
                mc_rank_data
            } = res

            if(res.err === 0){
                setIsinStage( is_in_stage === 1)
                setStage(stage)
                setMaster(arena_winner)
                if(mc_stage_rank_data){
                    stage_rank.unshift(mc_stage_rank_data)
                }
                if(mc_daily_rank_data){
                    daily_rank.unshift(mc_daily_rank_data)
                }
                if(mc_rank_data){
                    arenapoint_rank.unshift(mc_rank_data)
                }
                setRobPointsRankList(stage_rank)
                setRingRankSingleList(daily_rank)
                setRingRankAllList(arenapoint_rank)
            }

        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const renderCountTime = () => {
        const [time, setTime] = useState({ hour: '00', minute: '00', second: '00'})
        useEffect(() => {
            let timer
            if(isInStage){
               timer = setInterval(() => {
                    setNowTime(Date.now())
                    let diffTime = endTime - nowTime
                    setTime({
                        hour: padValue(parseInt((diffTime / 1000 / 60 / 60) % 60)),
                        minute: padValue(parseInt((diffTime / 1000 / 60) % 60)),
                        second: padValue(parseInt((diffTime / 1000) % 60))
                    })
                   if(time.second === '00'){
                       fetchData()
                   }
                }, 1000)
            }
            return () => {
                timer && clearInterval(timer)
            }
        }, [isInStage,time])

        return (
            <>
                <div className={style.robPoints_countDown}>倒计时：<div
                    className={style.robPoints_countDown_time}>{ time.hour + ':' + time.minute + ':' + time.second}</div>
                </div>
            </>
        )
    }


    const renderList = (props) => {
        return (
            <div className={style.robPoints_list}>
                {
                    props.map(item => {
                        return (
                            <div className={style.robPoints_list_item_wrapper} key={item.uid}>
                                <div className={style.robPoints_list_item}
                                    onClick={()=>handleGotoLive(item.platform_id,item.source,item.uid,item.live,item.notjumpst)}
                                >
                                    <span className={style.anchor_rank}>NO.{item.rank}</span>
                                    <div className={`${style.anchor_avatar} ${item.live === 1 && style.anchor_avatar_live}`}>
                                        <img src={item.headurl} alt=""/>
                                    </div>
                                    <span className={`${style.anchor_name} ellipsis`}>{item.name}</span>
                                    <span className={style.anchor_points}>{item.num}</span>
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
                            stage === 2 &&
                            (
                                <>
                                    <div className={`${style.master_avatar} ${master.live === 1 && style.master_avatar_live}`}>
                                        <img src={master.headurl} alt=""/>
                                    </div>
                                    <div className={style.master_name}>{master.name}</div>
                                    <div className={style.master_score}>{master.num}分</div>
                                </>
                            )
                        }
                        {
                            !isInStage && <div className={style.begin_text}>抢分赛将于14：00开启</div>
                        }
                        {
                            stage === 1 && <div className={style.begin_text}>抢分赛进行中，积分TOP1主播将成为擂主</div>
                        }
                    </div>
                </div>
                <div className={style.robPoints}>
                    <div className={stage === 2 ? style.ring_header : style.robPoints_header}></div>
                    {renderCountTime()}
                    <span className={style.robPoints_rule}>{ stage === 2 ? '积分高于擂主的积分即可成为新擂主':'积分TOP1主播将成为擂主' }</span>
                    <div className={style.robPoints_splitLine}></div>
                    <div className={style.list_header}>
                        <span>排名</span>
                        <span className={style.anchor}>主播</span>
                        <span className={style.blank}></span>
                        <span>积分</span>
                    </div>
                    {isInStage && renderList(robPointsRankList)}
                    {!isInStage && <div className={style.begin_text}>抢分赛将于14：00开启</div>}
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
                    {isInStage && rankStatus === 'single' && renderList(ringRankSingleList)}
                    {isInStage && rankStatus === 'all' && renderList(ringRankAllList)}
                    {!isInStage && <div className={style.begin_text}>暂无数据</div>}
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
                                    className={style.rule_text}><span>每天分为四个轮次，每3小时一个轮次</span>(14:00-17:00、17:00-20:00、20:00-23:00、23:00-02:00)
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
                                    className={style.rule_text}>抢擂台时间为抢分赛之后的两个小时，即每天15:00-17:00、18:00-20:00、
                                    21:00-23:00、00:00-02:00
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
        </>
    )
}
export default Main
