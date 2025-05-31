import { useDispatch, useSelector } from "react-redux"
import SectionContainer from "./Section/SectionContainer"
import type { AppDispatch } from "../Store/Store";
import { fetchCard, fetchCardStatus, resetCardStatus } from "../Slice/CardSlice";
import { closeLoader, showLoader } from "../Slice/PageSlice";
import { useEffect, useState } from "react";
import Loaders from "./Loaders";
import CreateCard from "./Card/CreateCard";
import CardFundForm from "./Card/CardFundForm";
import CardWithdrawForm from "./Card/CardWithdrawForm";
import CardImage from "./Card/CardImage";
import CardDetails from "./Card/CardDetails";
import Transaction from "./Transaction";



const Card = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(fetchCardStatus);
  const loader = useSelector(showLoader);
  const useCard = useSelector(fetchCard)
  const [showFundCardForm , setShowFundCardForm] = useState(false);
  const [showWithdrawForm , setShowWithdrawForm] = useState(false);
  const currentPageStyle = showFundCardForm  || showWithdrawForm ? 'hidden' : 'flex';

  useEffect (()=>{
            
     if(status === 'SUCCEEDED' || status === 'FAILED'){
        setTimeout (()=>{
           dispatch(closeLoader());
           dispatch(resetCardStatus());

        },100)
     }
  },[ dispatch,status])

  useEffect(()=>{}, [useCard])
  return loader ? <Loaders/> : !loader && !useCard ? <SectionContainer extraStyle={`${currentPageStyle} items-center`}><CreateCard/></SectionContainer>
    :
   <>  
      {showFundCardForm && <CardFundForm setShowFundCardForm = {setShowFundCardForm}/>}
      {showWithdrawForm && <CardWithdrawForm setShowWithdrawForm={setShowWithdrawForm}/>}
      <SectionContainer extraStyle={`${currentPageStyle} items-center`}>
          {useCard.img && <CardImage setShowFundCardForm={setShowFundCardForm} setShowWithdrawForm={setShowWithdrawForm}/>}
      </SectionContainer>

      <SectionContainer>
         <CardDetails/>
      </SectionContainer>

      <SectionContainer>
         {showFundCardForm || showWithdrawForm || <Transaction/> }
      </SectionContainer>

   </>
}

export default Card
