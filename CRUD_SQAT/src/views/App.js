import React, { Component } from 'react';

class App extends Component{
    constructor(){
        super();
        this.state = {
            _id: '',
            name : '',
            apellido : '',
            personas: [],
        };

        this.add_persona = this.add_persona.bind(this);
        this.inp_cambio = this.inp_cambio.bind(this);
    }

    componentDidMount() {
        this.get_personas();
    }

    add_persona(e){

        let met = (this.state._id !== '')? 'PUT' : 'POST';
        let id = (this.state._id !== '')? this.state._id : '';

        fetch('/api/all_data/' + id,{
            method: met,
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then((data)=>{
                M.toast({
                    html: data.msj
                });
                this.setState({_id: '', name: '', apellido:''});
                this.get_personas();
            })
            .catch(err => console.error(err));

        e.preventDefault();
    }

    inp_cambio(e){
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }
    get_personas(){
        fetch('/api/all_data')
            .then(resp => resp.json())
            .then(data => {
                this.setState({personas: data.response});
            });
    }

    update_persona(id_persona){
        fetch('/api/all_data/' + id_persona)
            .then(resp => resp.json())
            .then(data => {
                this.setState({_id: data.response._id, name: data.response.name, apellido: data.response.apellido});
            });
    }

    delete_persona(id_persona){
        fetch('/api/all_data/' + id_persona,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then((data)=>{
                M.toast({
                    html: data.msj
                });
                this.get_personas();
            })
            .catch(err => console.error(err));
    }


    render() {
        return(
            <div>
                <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a className='brand-logo' href="/">DU ASTANA IT</a>
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.add_persona}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='name' type="text" placeholder='Student Name' value={this.state.name} onChange={this.inp_cambio}/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='apellido' type="text" placeholder='Student Code' value={this.state.apellido} onChange={this.inp_cambio}/>
                                            </div>
                                        </div>
                                        <button type='submit' className='btn light-blue darken-4'>SEND</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Student Code</th>
                                    <th>Action</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.state.personas.map(persona =>{

                                        return(
                                            <tr key={persona._id}>
                                                <td>{persona.name}</td>
                                                <td>{persona.apellido}</td>
                                                <td>
                                                    <button className='btn light-blue darken-4' style={{margin:'4px'}} onClick={()=>{this.update_persona(persona._id)}}>
                                                        <i className='material-icons'>edit</i>
                                                    </button>
                                                    <button className='btn red darken-4' onClick={()=> { this.delete_persona(persona._id) }}>
                                                        <i className='material-icons'>delete</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default App;