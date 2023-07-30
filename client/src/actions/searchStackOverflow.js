import * as api from '../api'

export const searchStackOverflow = async(query) =>{
    try {
        // console.log('client src actions searchStackOverflow',query);
        const { data } = await api.searchStackOverflow(query)
        // console.log('client src actions searchStackOverflow',data);
        return data
    } catch (error) {
        console.log('client src actions searchStackOverflow searchStackOverflow',error)
    }
}