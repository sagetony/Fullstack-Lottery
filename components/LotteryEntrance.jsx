import { useEffect, useState } from "react"
import {useWeb3Contract, useMoralis, isWeb3Enabled} from "react-moralis"
import {abi, contractAddress} from "../constants"
import {ethers} from "ethers"
import {useNotification} from "web3uikit"
function LotteryEntrance (){
    const {isWeb3Enabled} = useMoralis()
    const {chainId: chainIdHex} = useMoralis()
    const dispatch = useNotification()
    const chainId = parseInt(chainIdHex)
    const [lotteryAmount, setLotteryAmount] = useState("0")
    const [NumberPlayers, setNumberPlayers] = useState("0")
    const [RecentWinner, setRecentWinner] = useState("0")
    const lotteryAddress = chainId in contractAddress ? contractAddress[chainId][0]: null
    const { runContractFunction: fundLottery } =
    useWeb3Contract({
      abi: abi,
      contractAddress: lotteryAddress,
      functionName: "fundLottery",
      params: {},
      msgValue: lotteryAmount
    });
    const { runContractFunction: getEthAmount } =
    useWeb3Contract({
      abi: abi,
      contractAddress: lotteryAddress,
      functionName: "getEthAmount",
      params: {},
    });
     const { runContractFunction: getNumberOfPlayers } =
    useWeb3Contract({
      abi: abi,
      contractAddress: lotteryAddress,
      functionName: "getNumberOfPlayers",
      params: {},
    });
     const { runContractFunction: getRecentWinner } =
    useWeb3Contract({
      abi: abi,
      contractAddress: lotteryAddress,
      functionName: "getRecentWinner",
      params: {},
    });
     async function updateUI(){
            const lotteryAmountCall = (await getEthAmount()).toString()
            const NumberPlayersCall = (await getNumberOfPlayers()).toString()
            const getRecentWinnerCall = await getRecentWinner()
            setLotteryAmount(lotteryAmountCall)
            setNumberPlayers(NumberPlayersCall)
            setRecentWinner(getRecentWinnerCall)
        }
    useEffect(()=>{
        if(isWeb3Enabled) {
            
            updateUI()
            
        }
      

    },[isWeb3Enabled])
    const handleSuccess = async function (tx){
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()

    }
    const handleNewNotification = () => {
            dispatch({
                type: 'info',
                message: 'Transaction Complete',
                title: 'Transaction Notification',
                icon: 'bell',
                position: 'topR',
            });
        };
    return (<div>
            {lotteryAddress ? 
            
                <div>
                    <button onClick={async function(){
                        await fundLottery({
                            onSuccess:handleSuccess, 
                            onError: (error) => console.log(error),
                        })
                    }}>Enter Lottery</button>
                    Entrance Fee: {ethers.utils.formatUnits(lotteryAmount, "ether")}
                    <br />
                    Number of Players: {NumberPlayers}
                    <br />
                    Recent Lottery Winner: {RecentWinner}
                    </div>
                : "No Address Detected"
            }
    </div>)
}
export default LotteryEntrance