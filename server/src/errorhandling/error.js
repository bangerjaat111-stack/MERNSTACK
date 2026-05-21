export const error=(err,res)=>{
    if(err.name==='validationerror') return res.status(400).send({ status:false,success:false,msg:err.message})

    return res.status(500).send({status:false,success:false,msg:err.message})
}