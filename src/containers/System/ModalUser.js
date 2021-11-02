
import { Button,Label,Modal,ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from "../../utils/emitter";
class ModalUser extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            phonenumber:'',
        }
        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('Event_Clear_Modal_Data',()=>{
            //reset state
           this.setState({
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            phonenumber:'',
           })
        })
    }
    componentDidMount() {
    }
    toggle=()=>{
       this.props.toggleFromParent();
    }
    handleOnChangeInput=(event,id)=>{
        let copyState={...this.state};
        copyState[id]=event.target.value;
        this.setState({
            ...copyState
        })
      
    }
    checkValidateInput=()=>{
        let isValid=true;
        let arrInput=['email','password','firstName','lastName','phonenumber','address'];
        for(let i=0;i<arrInput.length;i++)
        {
            if(!this.state[arrInput[i]]){
                isValid=false;
                alert('vui long nhap vao ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser=()=>{
        let isValid=this.checkValidateInput();
        if(isValid===true){
            //goi api
            this.props.createNewuser(this.state);
        }    
    }
    render() {
        return (  
                <Modal 
                 isOpen={this.props.isOpen}
                 toggle={()=>{this.toggle()}} 
                 className={'modal-user-container'}
                 size="lg"
                 >
                    <ModalHeader toggle={()=>{this.toggle()}}>Create a new user</ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                    <label>Email</label>
                                     <input type="text" 
                                     onChange={(event)=>{this.handleOnChangeInput(event,"email")}}
                                     value={this.state.email}
                                     />
                                </div>
                            <div className="input-container">
                                    <label>Password</label>
                                     <input type="password" 
                                     onChange={(event)=>{this.handleOnChangeInput(event,"password")}}
                                     value={this.state.password}/>
                                </div>
                            <div className="input-container">
                                    <label>First name</label>
                                     <input type="text"  
                                     onChange={(event)=>{this.handleOnChangeInput(event,"firstName")}}
                                     value={this.state.firstName}/>
                                </div>
                            <div className="input-container">
                                    <label>Last name</label>
                                     <input type="text" onChange={(event)=>{this.handleOnChangeInput(event,"lastName")}}
                                      value={this.state.lastName}/>
                                </div>
                            <div className="input-container">
                                    <label>Phone Number</label>
                                     <input type="text" onChange={(event)=>{this.handleOnChangeInput(event,"phonenumber")}}
                                      value={this.state.phonenumber}/>
                                </div>
                            
                            <div className="input-container max-width-input">
                                    <label>Address</label>
                                     <input type="text" onChange={(event)=>{this.handleOnChangeInput(event,"address")}}
                                     value={this.state.address}
                                     />
                                </div> 
                        </div>
                                
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                        color="primary" 
                        className="px-3" 
                        onClick={()=>{this.handleAddNewUser()}}
                        >Add</Button>{''}
                        <Button color="secondary" className="px-3" onClick={()=>{this.toggle()}}>Cancel</Button>
                    </ModalFooter>
                </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);






