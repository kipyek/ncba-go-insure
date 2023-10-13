import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState, useEffect } from "react"

const apiHeaders = () => {
    const [securityToken, setSecurityToken] = useState(null)
    const [sessionId, setSessionId] = useState(null)



    useEffect(() => {
        const fetchData = async () =>
            await AsyncStorage.getItem('headers').then((value: any) => {
                let parsed = JSON.parse(value)
                setSecurityToken(parsed.securityToken)
                setSessionId(parsed.sessionId)
            }).catch(error => {
                console.log(error)
            })

        fetchData()
    }, [])


    return { securityToken, sessionId }
}

export default apiHeaders