const useGetFilePath = () => {
    const getFilePath = (img) => {
        if (img) {
            return "http://localhost:1010/uploads/" + img
        }
        else {
            return "/logo612.jpg"
        }
    }
    return {getFilePath}
}
export default useGetFilePath;