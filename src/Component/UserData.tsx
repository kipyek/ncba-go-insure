import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState, useEffect } from "react"


const userData = () => {
    const [userId, setUserId] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPhone, setUserPhone] = useState(null)
    const [surname, setSurname] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [otherName, setOtherName] = useState(null)
    const [dob, setDob] = useState(null)
    const [pin, setPin] = useState(null)
    const [id, setId] = useState(null)



    useEffect(() => {
        const fetchData = async () =>
            await AsyncStorage.getItem('activeUser').then((value: any) => {
                let parsed = JSON.parse(value)
                setSurname(parsed.companyName)
                setFirstName(parsed.firstName)
                setOtherName(parsed.otherNames)
                setDob(parsed.dateOfBirth)
                setPin(parsed.kraPin)
                setId(parsed.id)
                setUserId(parsed.iraNumber)
                setUserEmail(parsed.email)
                setUserPhone(parsed.phoneNumber)
            }).catch(error => {
                console.log(error)
            })

        fetchData()
    }, [])


    return { userId, userEmail, userPhone, surname, firstName, otherName, dob, pin, id }
}


export default userData