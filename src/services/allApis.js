
import { BASEURL } from "./baseUrl"
import { commonRequest } from "./coomonRequest"

export const addUser=async(body,headers)=>{
    return await commonRequest("POST",`${BASEURL}/reg`,body,headers)
}

export const logUser=async(body)=>{
    return await commonRequest("POST",`${BASEURL}/login`,body,'')
}

export const bookAdd=async(body,headers)=>{
    return await commonRequest("POST",`${BASEURL}/add`,body,headers)
}


export const bookViews=async()=>{
    return await commonRequest("GET",`${BASEURL}/bookview`,'','')
}
export const bookVieww=async(search)=>{
    return await commonRequest("GET",`${BASEURL}/view?search=${search}`,'','')
}

export const mailCheck=async(body)=>{
    return await commonRequest("POST",`${BASEURL}/email`,body,'')
}

export const changePass1=async(id,body)=>{
    return await commonRequest("PUT",`${BASEURL}/pass/${id}`,body,'')
}

export const bookEditer=async(id,body,headers)=>{
    return await commonRequest("PUT",`${BASEURL}/editbook/${id}`,body,headers)
}

export const bookDel=async(id,headers)=>{
    return await commonRequest("DELETE",`${BASEURL}/del/${id}`,'',headers)
}
export const adminView=async(id)=>{
    return await commonRequest("GET",`${BASEURL}/viewuser/${id}`,'','')
}

export const editAdminProfile=async(id,body,headers)=>{
    return await commonRequest("PUT",`${BASEURL}/editadmin/${id}`,body,headers)
}

export const editStudentProfile=async(id,body,headers)=>{
    return await commonRequest("PUT",`${BASEURL}/editstudent/${id}`,body,headers)
}

export const viewStudentsByAdmin=async()=>{
    return await commonRequest("GET",`${BASEURL}/viewstuds`,'','')
}
export const bookingF=async(body)=>{
    return await commonRequest("POST",`${BASEURL}/reserve`,body,'')
}

export const decreaseC=async(id)=>{
    return await commonRequest("GET",`${BASEURL}/dec/${id}`,'','')
}

export const viewHistoryBook=async(id)=>{
    return await commonRequest("GET",`${BASEURL}/history/${id}`,'','')
}
  
export const returnBook=async(id,body)=>{
    return await commonRequest("PUT",`${BASEURL}/return/${id}`,body,'')
}

export const reservationViewByAdmin=async()=>{
    return await commonRequest("GET",`${BASEURL}/reserveview`,'','')
}

export const approveByAdmin=async(id,body)=>{
    return await commonRequest("PUT",`${BASEURL}/approve/${id}`,body,'')
}

export const increaseC=async(id,body)=>{
    return await commonRequest("PUT",`${BASEURL}/inc/${id}`,body,'')
}

 