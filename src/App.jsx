import Progress from './components/Progress'
import Alert from './components/Alert'
import ListGroup from './components/ListGroup'
import BtnGroup from './components/BtnGroup'

function App() {
    return (
        <div className="container">
            <h1 className="my-4">Компоненти</h1>

            <div className="component">
                <Progress percentage={40}/>
            </div>

            <div className="component">
                <Alert type="warning" text="What is love?"/>
            </div>

            <div className="component">
                <ListGroup>
                    <p>One</p>
                    <p>Two</p>
                </ListGroup>
            </div>

            <div className="component">
                <BtnGroup/>
            </div>
        </div>
    )
}

export default App