import React, { Component } from 'react'
import classes from './Home.css'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Form from '../../Form/Form';
import InputLabel from '@material-ui/core/InputLabel'
import Owners from '../../Owners/Owners';
class Home extends Component {

    state = {
        flats: [
            { no: 1,vacant:false, flatDetails: { rooms: 3, latBath: 2, kitchen: 2, location: 'vacany' }, flatOwner: [{ name: 'Abhinav', email: 'abhi@gmail.com', address: 'here there', contact: '1234567' }, { name: 'Ayushman', email: 'ayush@gmail.com', address: 'here there', contact: '987654' }, { name: 'Ayushman', email: 'ayush@gmail.com', address: 'here there', contact: '987654' }, { name: 'Ayushman', email: 'ayush@gmail.com', address: 'here there', contact: '987654' }] },
            { no: 2, vacant:false,flatDetails: { rooms: 5, latBath: 3, kitchen: 1, location: 'sunside' }, flatOwner: [{ name: 'Abhishek', email: 'abhishek@gmail.com', address: 'here there', contact: '1234567' }] },
            { no: 4, vacant:false,flatDetails: { rooms: 3, latBath: 2, kitchen: 2, location: 'vacany' }, flatOwner: [{ name: 'Nikhil', email: 'nikhil@gmail.com', address: 'here there', contact: '987654' }] },
        ],
        currentFlatOwner: [],
        owner: 'Show',
        no: 0,
        edit:false,
        flatDetails: { rooms: 0, latBath: 0, kitchen: 0, location: 'some location' },
    }
    //Handler for on change of Flat No. or ownerType
    flatChangeHandler = name => event => {
        this.setState({
            [name]: event.target.value,
        })
        this.changeFlatDetails(event.target.value);
    }
    ownerChangeHandler = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    //Diffrent Handlers.....
    changeOwnerName=(data,index)=>{
        let currentFlatOwner = [...this.state.currentFlatOwner]
        currentFlatOwner[index] = {...data}
        let flats = [...this.state.flats]
        let index1 = 0
        for(let [index,value] of flats.entries()){
            if(parseInt(this.state.no)===value.no){
                index1= index
            }
        }
        console.log(currentFlatOwner[index])
        flats[index1].flatOwner = currentFlatOwner;
        this.setState({
            currentFlatOwner:currentFlatOwner,
            flats:flats,
            edit:false
        })
    }
    changeFlatDetails = (m) => {
        let flats = [...this.state.flats]
        let currentFlatOwner = [...this.state.currentFlatOwner]
        for (let x in flats) {
            // eslint-disable-next-line
            if (flats[x].no == m) {
                currentFlatOwner = [...flats[x].flatOwner]
                this.setState({
                    flatDetails: { ...flats[x].flatDetails },
                    currentFlatOwner: currentFlatOwner,
                    owner: 'Show',
                })
                return;
            }
        }
        this.setState({
            flatDetails: {
                rooms: 0, latBath: 0, kitchen: 0, location: 'some location'
            },
            currentFlatOwner: []
        })
    }
    addNewOwner = (owner) => {
        let flatOwner = [...this.state.currentFlatOwner]
        if(owner.name===''||owner.address===''||owner.contact===''||owner.email===''){
            return;
        }
        flatOwner.push(owner);
        let flatDetails = []
        let flats=[...this.state.flats]
        
        let toBeChanged=[]
        let index1 = 0
        for(let [index,value] of this.state.flats.entries()){
            if(parseInt(this.state.no)===value.no){
                flatDetails = value
                toBeChanged = value.flatOwner
                index1 = parseInt(index)
            }
        }
        if(index1>0){
            toBeChanged.push(owner);
            flatDetails={
                ...flatDetails,
                flatOwner:toBeChanged
            }
            flats[index1] = flatDetails
            console.log("already" ,flats)
        }
        else{
            let data = {
                no:this.state.no,
                flatDetails:{rooms: 0, latBath: 0, kitchen: 0, location: 'some location'},
                flatOwner:[owner]
            }
            flats.push(data)
        }
        console.log(flats)
        this.setState({
            flats:flats,
            currentFlatOwner: flatOwner,
            owner: 'Show'
        })
    }
    cancelAddOwner =()=>{
        this.setState({
            owner:'Show'
        })
    }


    render() {
        return (
            <div className={classes.Home}>
                <span style={{ display: 'block', padding: '10px', borderBottom: '2px solid blueviolet', color: 'blueviolet', textTransform: 'uppercase' }}>Flat Owner Registration</span>
                {/* <span style={{border:'2px solid blueviolet',padding:'10px',color:'blueviolet',margin:'10px',display:'inline-block'}}>Flat No</span> */}
                <TextField
                    type="number"
                    label="Flat No."
                    variant="outlined"
                    onChange={this.flatChangeHandler("no")}
                    value={this.state.no}
                    style={{
                        width: '90px', height: '50px', textAlign: 'center', margin: '20px', display: 'inline-block'
                    }} />

                <fieldset className={classes.fieldset}>
                    <legend style={{ fontSize:'30px', color: 'blueviolet', marginRight: '20%' }}>Flat Details</legend>
                    <div className={classes.FlatDetails}><TextField label="No. of Room"
                        variant="outlined"
                        className={classes.textField}
                        value={this.state.flatDetails.rooms}

                        InputProps={{
                            readOnly: true
                        }} />
                        <TextField label="No. of Lat-Baths"
                            variant="outlined"
                            className={classes.textField}
                            value={this.state.flatDetails.latBath}

                            InputProps={{
                                readOnly: true
                            }} />
                        <TextField label="No. of Kitchen"
                            variant="outlined"
                            value={this.state.flatDetails.kitchen}
                            className={classes.textField}

                            InputProps={{
                                readOnly: true
                            }} />
                        <TextField label="Location"
                            variant="outlined"
                            className={classes.textField}
                            value={this.state.flatDetails.location}

                            InputProps={{
                                readOnly: true
                            }} /></div>



                </fieldset>
                <div style={{ display: 'block' }}>
                    <InputLabel
                        htmlFor="select"
                    >Select Owner</InputLabel>
                    <Select value={this.state.owner}
                        onChange={this.ownerChangeHandler('owner')}
                        inputProps={{
                            id: "select",
                            name: 'select'
                        }}
                        style={{ margin: '20px' }}
                    >   <MenuItem value='Show'>Show</MenuItem>
                        <MenuItem value="Add New">Add New</MenuItem>
                    </Select>
                </div>


                {
                    this.state.owner === 'Add New' ?
                        <Form click={this.addNewOwner} cancel={this.cancelAddOwner}/>
                        : null
                }
                <Owners owners={this.state.currentFlatOwner} editable={this.state.edit} changeOwnerName={this.changeOwnerName} />


            </div>

        )
    }
}

export default Home