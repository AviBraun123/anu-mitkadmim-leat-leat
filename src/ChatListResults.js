import ChatIntro from './ChatIntro';

function ChatListResults({ chating, setChosen , setClicked }) {

    const chatsList = chating.map((chat, key) => {
        return <ChatIntro {...chat} setChosen={setChosen} setClicked={setClicked} key={key} />
        
    });

    return (
        <div className="dudidu">
            {chatsList}
        </div>
        );
}

export default ChatListResults;