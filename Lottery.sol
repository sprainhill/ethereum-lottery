pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > 0.01 ether);
        
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        uint idx = random() % players.length;
        players[idx].transfer(this.balance);
        players = new address[](0);
    }
    
    // function modifiers
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
}