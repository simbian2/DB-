import React,{useContext,useReducer,useEffect,useState} from 'react'
import Store from '../../Store/context'
import reducer from '../../Store/reducer'
import {postCalculator1} from '../../api/api'
import { base_url } from '../../Store/baseurl'



const Calculator1 = ()=>{
    const {state,dispatch} = useContext(Store)

    const [Location, setLocation] = useState('.')
    const [Location2, setLocation2] = useState('.')
    const [apply, setapply] = useState('.')
    const [dbLocation, setdbLocation] = useState('.')
    

    const [Income, setIncome] = useState('.')
    const [Person, setPerson] = useState('.')
    const [Cost, setCost] = useState('.')



    const [option2, setOption2] = useState('.')
    const [option3, setOption3] = useState('.')

    const [Result1_Alert, setResult1_Alert] = useState('')
    const [Result2, setResult2] = useState(0)
    const [Result2_Alert, setResult2_Alert] = useState('')
    const [Result3, setResult3] = useState(0)
    const [Result3_Alert, setResult3_Alert] = useState('')

    const [Result4_Alert, setResult4_Alert] = useState('')


    const [alert, setAlert] = useState('지원 가능 여부입니다')
    const [className,setClassName] = useState('')

    const ChangeAlert = async (e) => {

        let options1 = {
            method:'GET'
        }

        let result1 = await fetch(`http://localhost/apply_alert1_1?apply=${apply}&Location=${Location}&dbLocation=${dbLocation}&option2=${option2}`,options1)
        const data1 = await result1.json()
        console.log(data1)
        dispatch({ type: 'apply_alert', payload: data1[0].apply_alert1 })

    }
    
    const changOption3 = (e) => {
        setOption3(e.target.value)

    }
    const changeOption2 = (e) => {
        setOption2(e.target.value)
    }
    
    const ChangeLocation = (e) => {
        setLocation(e.target.value)
    }

    const ChangeIncome = (e) => {
        setIncome(e.target.value)
    }

    const ChangePerson = (e) => {
        setPerson(e.target.value)
    }
    const ChangeCost = (e) => {
        setCost(e.target.value)
    }

    const option3_function0 = (e) => (
        setResult3(0), 
        setResult3_Alert('')
    )

    const option3_function1 = (e) => (
        setResult3(1), 
        setResult3_Alert('')
    )

    const option3_function2 = (e) => (
        setResult3(2), 
        setResult3_Alert('')
    )

    const option3_function3 = (e) => (
        setResult3(3), 
        setResult3_Alert('')
    )
    const HandleResult3 = (e) => {
        {
            option3 < 6 
            ? option3_function0()
            : ( option3 < 12
                ? option3_function1()
                : ( option3 >= 12 && option3 < 24
                    ? option3_function2()
                    : ( option3 >= 24
                        ? option3_function3()
                        : ( option3 == '.' 
                            ? setResult3_Alert('항목을 입력해주세요')
                            : ''
                                )

                        )
                    )
                )
        }
    }

    const HandleResult2 = (e) => {
        {
            Location == 'Incheon' && apply == '인천계양' && option2 >= 24 
            ? setResult2(3)
            : ( Location == 'Incheon' && apply == '인천계양' && option2 < 24 && option2 >= 12 
            ? setResult2(2)
            : ( Location == 'Incheon' && apply == '인천계양' && option2 < 12
            ? setResult2(1)
            : ( Location == 'seoul' && apply == '동작구수방사' && option2 >= 24 
            ? setResult2(3)
            : ( Location == 'seoul' && apply == '동작구수방사' && option2 < 24 && option2 >= 12 
            ? setResult2(2)
            : ( Location == 'seoul' && apply == '동작구수방사' && option2 < 12
            ? setResult2(1)
            : ( Location == 'GyeongGi' && apply != '동작구수방사' && apply != '인천계양' && option2 >= 24
            ? setResult2(3)
            : ( Location == 'GyeongGi' && apply != '동작구수방사' && apply != '인천계양' && option2 < 24 && option2 >= 12 
            ? setResult2(2)
            : ( Location == 'GyeongGi' && apply != '동작구수방사' && apply != '인천계양' && option2 < 12
            ? setResult2(1)
            : ( Location == '.' || apply == '.' || option2 == '.' || dbLocation == '.' || Location2 == '.'
              ? setResult2_Alert('모든 항목을 입력해주세요')
              : (
                Location != '.' || apply != '.' || option2 != '.' || dbLocation != '.' || Location2 != '.'
                ? setResult2_Alert('')
                : setResult2(0)
              )

            )

            )

            )

            )

            )

            )

            )

            )

            )
        }
    }
    
    const HandleResult1 = (e) => {
        HandleResult11()
        ,HandleResult12()
    }
    const HandleResult11 = async (e) => {

        let options = {
            method:'GET'
        }

        let result = await fetch(`http://localhost/IncomeScores?Income=${Income}&Person=${Person}&Cost=${Cost}`,options)
        const data = await result.json()
        
        dispatch({ type: 'Income_Score', payload: data[0].Income_Score })
        console.log(data[0].Income_Score)

        
    }

    const HandleResult12 = (e) => {
        {
            Income != "." && Person != "." && Cost != '.'
            ? setResult1_Alert('')
            : (Income == 0 || Person == 0 || Cost == '.' 
                ? setResult1_Alert('모든 항목을 입력해주세요')
                : '')
        }
    }


    const ChangeLocation2 = (e) => {
        setLocation2(e.target.value)
    }

    const Applying_Location = (e) => {
        setapply(e.target.value)
    }

    const dbLocationset = (e) => {
        setdbLocation(e.target.value)
    }


    const successSubmit = (e) => {
        setResult4_Alert('결과가 저장되었습니다!'),
        setClassName('blue'),
        postCalculator1({income:state.Income_Score,Resident_period:Result2,Resident_Location1:Location,Resident_Location2:dbLocation,Number_Of_Payment:Result3,Applying_Location:apply})

    }
    const handleSubmit = (e) => {

        e.preventDefault()
        {
            Result1_Alert == '모든 항목을 입력해주세요' || Result2_Alert == '모든 항목을 입력해주세요' || Result3_Alert == '모든 항목을 입력해주세요' || state.Income_Score == 0 || Location == '.' || apply == '.' || option3 == '.' || dbLocation == '.' || Location2 == '.'
            ? setResult4_Alert('모든 항목의 점수를 내주세요')
            : successSubmit()
        }

    }
    
    return(
        <>
            <div className = "subscription_wrap w100">
                <div className = "subscription w1200">
                    <div>
                    <form onSubmit = {handleSubmit}>
                        <div className = "calculator_content1">
                            <div className = "option1">
                                <h5>(1) 가구소득</h5><input onClick = {HandleResult1} onTouch = {HandleResult1} className = "BTN" type = "button" value = "점수 계산"/>
                                <div>
                                </div>
                                <div className = "inline-block">
                                <h6>1. 배우자 소득 유무</h6>
                                <select onClick = {ChangeIncome}>
                                    <option>선택</option>
                                    <option value = "two">맞벌이</option>
                                    <option value = "one">외벌이</option>
                                    <option value = "zero">둘 다 무직</option>
                                </select>
                                </div>
                                <div className = "inline-block margin-left">
                                <h6>2. 가구 수</h6>
                                <select onClick = {ChangePerson}>
                                    <option>선택</option>
                                    <option value = "three">3인 이하</option>
                                    <option value = "four">4인</option>
                                    <option value = "five">5인</option>
                                    <option value = "six">6인</option>
                                    <option value = "seven">7인</option>
                                    <option value = "eight">8인</option>
                                </select>
                                </div>
                                <div className = "inline-block margin-left">
                                <h6>3. 소득금액</h6>
                                    <div><input className = "option1" type = "text" onChange = {ChangeCost} />원</div>     
                                </div>
                                <div className = "score">점수 : <span className = "option1_result">{state.Income_Score}</span><span className = "red">{Result1_Alert}</span></div>
                            </div>
                            <div className = "option3">
                                <h5>(2) 주택청약종합저축 납입인정 횟수</h5>
                                <div className = "inline-block">
                                    <input onChange = {changOption3} type = "text" />회
                                </div>
                                <input onClick = {HandleResult3} onTouch = {HandleResult3} className = "BTN subbtn" type = "button" value = "점수 계산"/>
                                <div className = "score">점수 : <span className = "option1_result">{Result3}</span><span className = "red">{Result3_Alert}</span></div>
                            </div>
                            <div className = "option2">
                                <h5>(3) 해당 시*도 연속 거주기간</h5><input onClick = {HandleResult2} onTouch = {HandleResult2} className = "BTN" type = "button" value = "점수 계산"/>
                                <div></div>
                                <div className = "inline-block">
                                <h6>1. 거주 지역</h6>
                                <select onClick = {ChangeLocation} onTouch = {ChangeLocation}>
                                    <option>
                                        시/도
                                    </option>
                                    <option value = "seoul">
                                        서울특별시
                                    </option>
                                    <option value = "busan">
                                        부산광역시
                                    </option>
                                    <option value = "dagu">
                                        대구광역시
                                    </option>
                                    <option value = "Incheon">
                                        인천광역시
                                    </option>
                                    <option value = "GwangJu">
                                        광주광역시
                                    </option>
                                    <option value = "Daejeon">
                                        대전광역시
                                    </option>
                                    <option value = "Ulsan">
                                        울산광역시
                                    </option>
                                    <option value = "SaeJong">
                                        세종특별자치시
                                    </option>
                                    <option value = "GyeongGi">
                                        경기도
                                    </option>
                                    <option value = "GangWon">
                                        강원도
                                    </option>
                                    <option value = "ChungCheong1">
                                        충청북도
                                    </option>
                                    <option value = "ChungCheong2">
                                        충청남도
                                    </option>
                                    <option value = "JeongLa1">
                                        전라북도
                                    </option>
                                    <option value = "JeongLa2">
                                        전라남도
                                    </option>
                                    <option value = "GyeongSang1">
                                        경상북도
                                    </option>
                                    <option value = "GyeongSang2">
                                        경상남도
                                    </option>
                                    <option value = "Jeju">
                                        제주특별자치도
                                    </option>
                                </select>   
                                <select onClick = {dbLocationset}  onTouch = {dbLocationset}>
                                    <option>
                                        군/구
                                    </option>
                                        {
                                            Location === 'seoul'
                                            ? <>
                                                <option value = "종로구">종로구</option>
                                                <option value = "중구">중구</option>
                                                <option value = "용산구">용산구</option>
                                                <option value = "성동구">성동구</option>
                                                <option value = "광진구">광진구</option>
                                                <option value = "동대문구">동대문구</option>
                                                <option value = "중량구">중량구</option>
                                                <option value = "성북구">성북구</option>
                                                <option value = "강북구">강북구</option>
                                                <option value = "도봉구">도봉구</option>
                                                <option value = "노원구">노원구</option>
                                                <option value = "은평구">은평구</option>
                                                <option value = "서대문구">서대문구</option>
                                                <option value = "마포구">마포구</option>
                                                <option value = "양천구">양천구</option>
                                                <option value = "강서구">강서구</option>
                                                <option value = "구로구">구로구</option>
                                                <option value = "금천구">금천구</option>
                                                <option value = "영등포구">영등포구</option>
                                                <option value = "동작구">동작구</option>
                                                <option value = "관악구">관악구</option>
                                                <option value = "서초구">서초구</option>
                                                <option value = "강남구">강남구</option>
                                                <option value = "송파구">송파구</option>
                                                <option value = "강동구">강동구</option>
                                                </>
                                                : ( Location === 'busan'
                                                    ? <>
                                                    <option value = "중구">중구</option>
                                                    <option value = "서구">서구</option>
                                                    <option value = "동구">동구</option>
                                                    <option value = "영도구">영도구</option>
                                                    <option value = "부산진구">부산진구</option>
                                                    <option value = "동래구">동래구</option>
                                                    <option value = "남구">남구</option>
                                                    <option value = "북구">북구</option>
                                                    <option value = "해운대구">해운대구</option>
                                                    <option value = "사하구">사하구</option>
                                                    <option value = "금정구">금정구</option>
                                                    <option value = "강서구">강서구</option>
                                                    <option value = "연제구">연제구</option>
                                                    <option value = "수영구">수영구</option>
                                                    <option value = "사상구">사상구</option>
                                                    <option value = "기장군">기장군</option>
                                                    </>
                                                    : ( Location === 'dagu'
                                                    ? <>
                                                    <option value = "중구">중구</option>
                                                    <option value = "동구">동구</option>
                                                    <option value = "서구">서구</option>
                                                    <option value = "남구">남구</option>
                                                    <option value = "북구">북구</option>
                                                    <option value = "수성구">수성구</option>
                                                    <option value = "달서구">달서구</option>
                                                    <option value = "달성군">달성군</option>
                                                    </>
                                                    : ( Location === 'GwangJu'
                                                    ? <>
                                                    <option value = "동구">동구</option>
                                                    <option value = "서구">서구</option>
                                                    <option value = "남구">남구</option>
                                                    <option value = "북구">북구</option>
                                                    <option value = "광산구">광산구</option>
                                                    </>
                                                    : ( Location === 'Daejeon'
                                                    ? <>
                                                    <option value = "동구">동구</option>
                                                    <option value = "중구">중구</option>
                                                    <option value = "서구">서구</option>
                                                    <option value = "유성구">유성구</option>
                                                    <option value = "대덕구">대덕구</option>
                                                    </>
                                                    : ( Location === 'Ulsan'
                                                    ? <>
                                                    <option value = "중구">중구</option>
                                                    <option value = "남구">남구</option>
                                                    <option value = "동구">동구</option>
                                                    <option value = "북구">북구</option>
                                                    <option value = "울주군">울주군</option>
                                                    </>
                                                    : ( Location === 'Incheon'
                                                    ? <>
                                                    <option value = "중구">중구</option>
                                                    <option value = "동구">동구</option>
                                                    <option value = "미추홀구">미추홀구</option>
                                                    <option value = "연수구">연수구</option>
                                                    <option value = "남동구">남동구</option>
                                                    <option value = "부평구">부평구</option>
                                                    <option value = "계양구">계양구</option>
                                                    <option value = "서구">서구</option>
                                                    <option value = "강화군">강화군</option>
                                                    <option value = "옹진군">옹진군</option>
                                                    </>
                                                    : ( Location === 'SaeJong'
                                                    ? <>
                                                    <option value = "세종특별자치시">세종특별자치시</option>
                                                    </>
                                                    : ( Location === 'GyeongGi'
                                                    ? <>
                                                    <option value = "수원시">수원시</option>
                                                    <option value = "성남시">성남시</option>
                                                    <option value = "고양시">고양시</option>
                                                    <option value = "용인시">용인시</option>
                                                    <option value = "부천시">부천시</option>
                                                    <option value = "안산시">안산시</option>
                                                    <option value = "안양시">안양시</option>
                                                    <option value = "남양주시">남양주시</option>
                                                    <option value = "화성시">화성시</option>
                                                    <option value = "평택시">평택시</option>
                                                    <option value = "의정부시">의정부시</option>
                                                    <option value = "시흥시">시흥시</option>
                                                    <option value = "파주시">파주시</option>
                                                    <option value = "광명시">광명시</option>
                                                    <option value = "김포시">김포시</option>
                                                    <option value = "군포시">군포시</option>
                                                    <option value = "광주시">광주시</option>
                                                    <option value = "이천시">이천시</option>
                                                    <option value = "양주시">양주시</option>
                                                    <option value = "오산시">오산시</option>
                                                    <option value = "구리시">구리시</option>
                                                    <option value = "안성시">안성시</option>
                                                    <option value = "포천시">포천시</option>
                                                    <option value = "의왕시">의왕시</option>
                                                    <option value = "하남시">하남시</option>
                                                    <option value = "여주시">여주시</option>
                                                    <option value = "양평군">양평군</option>
                                                    <option value = "동두천시">동두천시</option>
                                                    <option value = "과천시">과천시</option>
                                                    <option value = "가평군">가평군</option>
                                                    <option value = "연천군">연천군</option>
                                                    </>
                                                    : ( Location === 'GangWon'
                                                    ? <>
                                                    <option value = "춘천시">춘천시</option>
                                                    <option value = "원주시">원주시</option>
                                                    <option value = "강릉시">강릉시</option>
                                                    <option value = "동해시">동해시</option>
                                                    <option value = "태백시">태백시</option>
                                                    <option value = "속초시">속초시</option>
                                                    <option value = "삼척시">삼척시</option>
                                                    <option value = "홍천군">홍천군</option>
                                                    <option value = "횡성군">횡성군</option>
                                                    <option value = "영월군">영월군</option>
                                                    <option value = "평창군">평창군</option>
                                                    <option value = "정선군">정선군</option>
                                                    <option value = "철원군">철원군</option>
                                                    <option value = "화천군">화천군</option>
                                                    <option value = "양구군">양구군</option>
                                                    <option value = "인제군">인제군</option>
                                                    <option value = "고성군">고성군</option>
                                                    <option value = "양양군">양양군</option>
                                                    </>
                                                    : ( Location === 'ChungCheong1'
                                                    ? <>
                                                    <option value = "청주시">청주시</option>
                                                    <option value = "충주시">충주시</option>
                                                    <option value = "제천시">제천시</option>
                                                    <option value = "보은군">보은군</option>
                                                    <option value = "옥천군">옥천군</option>
                                                    <option value = "영동군">영동군</option>
                                                    <option value = "진천군">진천군</option>
                                                    <option value = "괴산군">괴산군</option>
                                                    <option value = "음성군">음성군</option>
                                                    <option value = "단양군">단양군</option>
                                                    <option value = "증평군">증평군</option>
                                                    </>
                                                    : ( Location === 'ChungCheong2'
                                                    ? <>
                                                    <option value = "천안시">천안시</option>
                                                    <option value = "공주시">공주시</option>
                                                    <option value = "보령시">보령시</option>
                                                    <option value = "아산시">아산시</option>
                                                    <option value = "서산시">서산시</option>
                                                    <option value = "논산시">논산시</option>
                                                    <option value = "계룡시">계룡시</option>
                                                    <option value = "당진시">당진시</option>
                                                    <option value = "금산군">금산군</option>
                                                    <option value = "부여군">부여군</option>
                                                    <option value = "서천군">서천군</option>
                                                    <option value = "청양군">청양군</option>
                                                    <option value = "홍성군">홍성군</option>
                                                    <option value = "예산군">예산군</option>
                                                    <option value = "태안군">태안군</option>
                                                    </>
                                                    : ( Location === 'JeongLa1'
                                                    ? <>
                                                    <option value = "전주시">전주시</option>
                                                    <option value = "군산시">군산시</option>
                                                    <option value = "익산시">익산시</option>
                                                    <option value = "정읍시">정읍시</option>
                                                    <option value = "남원시">남원시</option>
                                                    <option value = "김제시">김제시</option>
                                                    <option value = "완주군">완주군</option>
                                                    <option value = "진안군">진안군</option>
                                                    <option value = "무주군">무주군</option>
                                                    <option value = "장수군">장수군</option>
                                                    <option value = "임실군">임실군</option>
                                                    <option value = "순창군">순창군</option>
                                                    <option value = "고창군">고창군</option>
                                                    <option value = "부안군">부안군</option>
                                                    </>
                                                    : ( Location === 'JeongLa2'
                                                    ? <>
                                                    <option>목포시</option>
                                                    <option>여수시</option>
                                                    <option>순천시</option>
                                                    <option>나주시</option>
                                                    <option>광양시</option>
                                                    <option>담양군</option>
                                                    <option>곡성군</option>
                                                    <option>구례군</option>
                                                    <option>고흥군</option>
                                                    <option>보성군</option>
                                                    <option>화순군</option>
                                                    <option>장흥군</option>
                                                    <option>강진군</option>
                                                    <option>해남군</option>
                                                    <option>영암군</option>
                                                    <option>무안군</option>
                                                    <option>함평군</option>
                                                    <option>영광군</option>
                                                    <option>장성군</option>
                                                    <option>완도군</option>
                                                    <option>진도군</option>
                                                    <option>신안군</option>
                                                    </>
                                                    : ( Location === 'JeongLa2'
                                                    ? <>
                                                    <option value = "목포시">목포시</option>
                                                    <option value = "여수시">여수시</option>
                                                    <option value = "순천시">순천시</option>
                                                    <option value = "나주시">나주시</option>
                                                    <option value = "광양시">광양시</option>
                                                    <option value = "담양군">담양군</option>
                                                    <option value = "곡성군">곡성군</option>
                                                    <option value = "구례군">구례군</option>
                                                    <option value = "고흥군">고흥군</option>
                                                    <option value = "보성군">보성군</option>
                                                    <option value = "화순군">화순군</option>
                                                    <option value = "장흥군">장흥군</option>
                                                    <option value = "강진군">강진군</option>
                                                    <option value = "해남군">해남군</option>
                                                    <option value = "영암군">영암군</option>
                                                    <option value = "무안군">무안군</option>
                                                    <option value = "함평군">함평군</option>
                                                    <option value = "영광군">영광군</option>
                                                    <option value = "장성군">장성군</option>
                                                    <option value = "완도군">완도군</option>
                                                    <option value = "진도군">진도군</option>
                                                    <option value = "신안군">신안군</option>
                                                    </>
                                                    : ( Location === 'GyeongSang1'
                                                    ? <>
                                                    <option value = "포항시">포항시</option>
                                                    <option value = "경주시">경주시</option>
                                                    <option value = "김천시">김천시</option>
                                                    <option value = "안동시">안동시</option>
                                                    <option value = "구미시">구미시</option>
                                                    <option value = "영주시">영주시</option>
                                                    <option value = "영천시">영천시</option>
                                                    <option value = "상주시">상주시</option>
                                                    <option value = "문경시">문경시</option>
                                                    <option value = "경산시">경산시</option>
                                                    <option value = "군위군">군위군</option>
                                                    <option value = "의성군">의성군</option>
                                                    <option value = "청송군">청송군</option>
                                                    <option value = "영양군">영양군</option>
                                                    <option value = "영덕군">영덕군</option>
                                                    <option value = "청도군">청도군</option>
                                                    <option value = "고령군">고령군</option>
                                                    <option value = "성주군">성주군</option>
                                                    <option value = "칠곡군">칠곡군</option>
                                                    <option value = "예천군">예천군</option>
                                                    <option value = "봉화군">봉화군</option>
                                                    <option value = "울진군">울진군</option>
                                                    <option value = "울릉군">울릉군</option>
                                                    </>
                                                    : ( Location === 'GyeongSang2'
                                                    ? <>
                                                    <option value = "창원시">창원시</option>
                                                    <option value = "진주시">진주시</option>
                                                    <option value = "통영시">통영시</option>
                                                    <option value = "사천시">사천시</option>
                                                    <option value = "김해시">김해시</option>
                                                    <option value = "밀양시">밀양시</option>
                                                    <option value = "거제시">거제시</option>
                                                    <option value = "양산시">양산시</option>
                                                    <option value = "의령군">의령군</option>
                                                    <option value = "함안군">함안군</option>
                                                    <option value = "창녕군">창녕군</option>
                                                    <option value = "고성군">고성군</option>
                                                    <option value = "하동군">하동군</option>
                                                    <option value = "남해군">남해군</option>
                                                    <option value = "산청군">산청군</option>
                                                    <option value = "함양군">함양군</option>
                                                    <option value = "거창군">거창군</option>
                                                    <option value = "합천군">합천군</option>
                                                    </>
                                                    : ( Location === 'Jeju'
                                                    ? <>
                                                    <option value = "제주특별자치도">제주특별자치도</option>
                                                    </>
                                                    : 'GyeongSang1')))))))))))))))))
                                        }
                                </select>
                                </div>
                                <div className = "inline-block margin-left">
                                <h6>2. 거주 기간</h6>
                                <div className = ""><input onChange = {changeOption2} type = "text"/>개월</div>
                                </div>
                            </div>
                            <div className = "score totalScore apply">지원 지역</div>
                            <select className = "Select_Box" onClick = {ChangeLocation2}  onTouch = {ChangeLocation2}>
                                <option value = "first">1차 지원(7월)</option>
                                <option value = "second">2차 지원(10월)</option>
                                <option value = "third">3차 지원(11월)</option>
                                <option value = "fourth">4차 지원(12월)</option>
                            </select>
                            <select className = "Select_Box" onClick = {Applying_Location} onTouch = {Applying_Location}>
                                {
                                    Location2 == 'first'
                                    ? <>
                                    <option value = "인천계양">인천계양</option>
                                    <option value = "남양주진접2">남양주진접2</option>
                                    <option value = "성남복정1">성남복정1</option>
                                    <option value = "의왕청계2">의왕청계2</option>
                                    <option value = "위례">위례</option></>
                                    : (
                                        Location2 == 'second'
                                        ? <>
                                    <option value = "성남낙생">성남낙생</option>
                                    <option value = "성남복정2">성남복정2</option>
                                    <option value = "군포대야미">군포대야미</option>
                                    <option value = "의왕월암">의왕월암</option>
                                    <option value = "수원당수">수원당수</option>
                                    <option value = "부천원종">부천원종</option></>
                                        : (
                                            Location2 == 'third'
                                            ? <>
                                   <option value = "시흥하중">시흥하중</option>
                                   <option value = "과천주암">과천주암</option></>
                                            : (
                                                Location2 == 'fourth'
                                                ? <> <option value = "남양주왕숙2">남양주왕숙2</option>
                                                <option value = "성남금토">성남금토</option>
                                                <option value = "부천대장">부천대장</option>
                                                <option value = "고양창릉">고양창릉</option>
                                                <option value = "부천역곡">부천역곡</option>
                                                <option value = "시흥거모">시흥거모</option>
                                                <option value = "안산장상">안산장상</option>
                                                <option value = "안산신길2">안산신길2</option>
                                                <option value = "동작구수방사">동작구수방사</option>
                                                <option value = "구리갈매역세권">구리갈매역세권</option></>
                                                :'bye'
                                            )
                                        )
                                    )
                                }
                            </select>
                            <div className = "score">점수 : <span className = "option1_result">{Result2}</span><span className = "red">{Result2_Alert}</span></div>
                            <div className = "block"><div className = "score totalScore inline-block">총점 : <span className = "total_result">{state.Income_Score+Result2+Result3}</span>/9</div><input className = "submitBTN" value = "결과 보기" onClick = {ChangeAlert} type = "submit"/></div>
                            <div className = "result4_alert red"><span className = {className}>{Result4_Alert}</span></div>
                        </div>
                        <div className = "LocationBox2">{state.apply_alert1}</div>
                    </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Calculator1