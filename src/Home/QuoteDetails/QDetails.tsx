import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Box } from '../../Component/Theme'

const QDetails = () => {
    const [activeArea, setActiveArea] = useState("New");
    const tabs = [
        { id: "news", title: "New" },
        { id: "accepteds", title: "Accepted" },
        { id: "ongoings", title: "Ongoing" },
    ];
    return (
        <View>
            <Box >
                <Box
                    style={{
                        justifyContent: 'space-between',
                        marginTop: 12,
                        flexDirection: "row",
                    }}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab.id}
                                style={{
                                    flexDirection: "row",
                                    paddingHorizontal: 5,
                                    borderBottomColor: activeArea === tab.title ? '#a06931' : "transparent",
                                    borderBottomWidth: 2,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    //borderRadius: 20,
                                    marginHorizontal: 5,
                                }}
                                onPress={() => setActiveArea(tab.title)}
                            >

                                <Text
                                    style={{
                                        color: activeArea === tab.title ? "#a06931" : 'grey',
                                    }}
                                >
                                    {tab.title}
                                </Text>

                            </TouchableOpacity>

                        ))}
                    </ScrollView>
                </Box>


                {/* {activeArea === "New" &&
                    NewScreen()
                }
                {activeArea === "Accepted" &&
                    AcceptedScreen()
                }
                {activeArea === "Ongoing" &&
                    OngoingScreen()
                } */}




            </Box>
        </View>
    )
}

export default QDetails

const styles = StyleSheet.create({})