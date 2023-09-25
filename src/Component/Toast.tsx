import Toast from "react-native-root-toast"

export const handleToastCopied = (item: any) => {
    return (
        Toast.show(`Copied ${item} to clipboard`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: 'green',
            containerStyle: { marginTop: 20 },
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        })
    )

}