import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState, useEffect } from "react"


const userData = () => {
    const [userId, setUserId] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPhone, setUserPhone] = useState(null)

    useEffect(() => {
        const fetchData = async () =>
            await AsyncStorage.getItem('activeUser').then((value: any) => {
                let parsed = JSON.parse(value)
                setUserId(parsed.id)
                setUserEmail(parsed.email)
                setUserPhone(parsed.phoneNumber)
            }).catch(error => {
                console.log(error)
            })

        fetchData()
    }, [])


    return { userId, userEmail, userPhone }
}

export default userData