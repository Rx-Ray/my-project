import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var ucid=0;
var hid=0;

class All extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ucid:null
        }
    }

    G(e){
        this.setState({ucid:e});
        alert(e);
    }

    render(){
        return(
            <body>
                <Box G={this.state.G}/>
                <Header />
            </body>
        )
    }
}

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            name: 'David',
            isLogged: false,
        }
    }
    render(){
        return(
            <div className='header'>
                Hello,{this.state.name}
            </div>
        );
    }

}

class Box extends React.Component{
    constructor(props){
        super(props);
        this.setChose=this.setChose.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            lists:[
                {name: 'math', ddl: '2022-01-03',uid: '114514'},
            ],
            chose:null,
        };
    }
    setChose(e){
        this.setState({chose:e});
        hid=e;
    }
    componentDidMount(){

    }
    render(){
        const items=this.state.lists.map((work) => <Work sty="finish" name={work.name} ddl={work.ddl} S={this.setChose} uid={work.uid}/>)
        return(
            <div style={{top:'55px',position:'absolute',width:'1500px'}}>
                <ul style={{position:'absolute'}}>{items}</ul>
                <Hand uid={this.state.chose} G={this.props.G}/>
            </div>
        )
    }
}

class Work extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(){
        this.props.S(this.props.uid);
    }
    render(){
        return(
            <li className={this.props.sty} onClick={this.handleClick}>
                <span>{this.props.name}</span>
                <span style={{float:'right',fontSize:'small',color:'GrayText',fontWeight:'lighter'}}>{this.props.ddl}</span>
            </li>
        )
    }
}

class Hand extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bid:0,
        }
        this.a=this.a.bind(this);
        this.b=this.b.bind(this);
        this.c=this.c.bind(this);
        this.d=this.d.bind(this);
    }
    a(){this.setState({bid:1})}
    b(){this.setState({bid:2})}
    c(){this.setState({bid:3})}
    d(){this.setState({bid:4})}

    choose(co){
        if(co===0) return <Login G={this.props.G}/>;
        if(co===1) return <Uper/>;
        if(co===3) return <Checker />;
        if(co===4) return <Puber />;
    }
    render(){
        return(
            <div style={{left:'50%',position:'fixed'}}>
                <h1>作业id:{this.props.uid}</h1>
                <div className='a' onClick={this.a}>提交作业</div>
                <a href={""+hid} download='download'><div className='b' onClick={this.b}>下载批改文件</div></a>
                <div className='c' onClick={this.c}>检查作业情况</div>
                <div className='d' onClick={this.d}>布置作业</div>
                {this.choose(this.state.bid)}
            </div>
        )
    }
}

class Uper extends React.Component{
    render(){
        return (
            <form action="/" method="post" enctype="multipart/form-data">
                <div><input type="file" multiple="multiple" name={ucid}/></div>
                <div><input type="submit" value="上传"/></div>
            </form>
        )
    }
}

class Checker extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sts:["认识","皮卡","asd"],
        }
    }
    render(){
        const items=this.state.sts.map((work) =><li className="names"><span>{work}</span></li>);
        return <ul style={{position:'absolute',left:'230px',top:'0',width:'400px'}}>{items}</ul>
    }
}

class Puber extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {value: ''};
//   
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    // }
//   
    // handleChange(event) {
    //   this.setState({value: event.target.value});
    // }
//   
    // handleSubmit(event) {
    //   alert('提交的名字: ' + this.state.value);
    //   event.preventDefault();
    // }
  
    render() {
      return (
        <form style={{position:'absolute',left:'200px',top:'10px',width:'240px'}}>
          <label>
            作业名称:<input type="text" />
          </label>
          <label>
            作业类型:<input type="text" />
          </label>
          <label>
            作业描述:<input type="text" />
          </label>
          <label>
            截止日期:<input type="text" />
          </label>
          <input type="submit" value="提交" />
        </form>
      );
    }
  }

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            uid:null,
            password:null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChang = this.handleChang.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {this.setState({uid: event.target.value});}
    handleChang(event) {this.setState({password: event.target.value});}
    
    handleSubmit(event) {
        alert(this.state.password);
        fetch("http://php.api/PHP/Login.php",{
            method: 'post',
            body:JSON.stringify({uid:this.state.uid,password:this.state.password}),
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(
            (result)=>{this.props.G(result)}
        );
        event.preventDefault();
    }

    render(){
        return(
            <form style={{position:'absolute',left:'200px',top:'10px',width:'240px'}} onSubmit={this.handleSubmit}>
                <label>
                  id:<input type="text" onChange={this.handleChange}/>
                </label><br/>
                <label>
                  密码:<input type="text" onChange={this.handleChang}/>
                </label><br/>
                <input type="submit" value="登录" />
            </form>
        )
    }
}

ReactDOM.render(<All />,document.getElementById('root'));