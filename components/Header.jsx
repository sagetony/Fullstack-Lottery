import {ConnectButton} from "web3uikit"
function Header() {
    return (
    <div className="border-b-2">
        Decentralized Lottery Application
        <ConnectButton moralisAuth = {false} />
    </div>
    )
}

export default Header