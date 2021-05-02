import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ListaGrupos extends Component {

    constructor(props) {
        super(props);
        this.state = {grupos: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/grupos')
            .then(response => response.json())
            .then(data => this.setState({grupos: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/grupo/${id}` , {
            method: 'DELETE',
            headers: {
                'Accept': 'aplication/json',
                'Content-Type': 'aplication/json'
            }
        }).then(() => {
            let updatedGrupos = [...this.state.grupos].filter(i => i.id !== id);
            this.setState({grupos: updatedGrupos});
        });
    }

    render() {
        const {grupos, isLoading} = this.state;

        if (isLoading) {
            return <p>Carregando...</p>
        }

        const listaGrupos = grupos.map(grupo => {
            const endereco = `${grupo.endereco || ''} ${grupo.cidade || ''} ${grupo.estadoProvincia || ''}`;
            return <tr key={grupo.id}>
                <td style={{whiteSpace: 'nowrap'}}>{grupo.nome}</td>
                <td>{endereco}</td>
                <td>{grupo.evento.map(evento => {
                    return <div key={evento.id}>{new Intl.DateTimeFormat('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(evento.data))}: {evento.titulo}</div>
                })}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/grupos/" + grupo.id}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(grupo.id)}>Excluir</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/grupos/novo">Cadastrar um novo Grupo</Button>
                    </div>
                    <h3>Eventos</h3>
                    <Table className="mt-4"> 
                        <thead>
                            <tr>
                                <th width="20%">Nome</th>
                                <th width="20%">Local</th>
                                <th>Eventos</th>
                                <th width="10%">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListaGrupos}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );

    }

}

export default ListaGrupos;