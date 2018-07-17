import React, { Component } from 'react';
import {
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import Post from './Post';
import HeaderUsuario from './HeaderUsuario';
import InstaluraFetchService from '../services/InstaluraFetchService';
import Notificacao from '../api/Notificacao';

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(evento => {
      if(evento.id === 'willAppear')
        this.load();
    });
  }

  load() {
    let uri = "/fotos";
    if(this.props.usuario)
      uri = `/public/fotos/${this.props.usuario}`;

    InstaluraFetchService.get(uri)
      .then(json => this.setState({fotos: json, status: 'NORMAL'}))
      .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
  }

  buscaPorId(idFoto) {
    return this.state.fotos
        .find(foto => foto.id === idFoto)
  }

  atualizaFotos(fotoAtualizada) {
    const fotos = this.state.fotos
        .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada: foto)
    this.setState({fotos})
  }

  like(idFoto) {
    const listaOriginal = this.state.fotos;
    const foto = this.buscaPorId(idFoto);

    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => {

        let novaLista = []
        if(!foto.likeada) {
          novaLista = [
            ...foto.likers,
            {login: usuarioLogado}
          ]
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuarioLogado
          })
        }
        return novaLista;
      })
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }

        this.atualizaFotos(fotoAtualizada);
      });

    InstaluraFetchService.post(`/fotos/${idFoto}/like`)
      .catch(e => {
        this.setState({fotos: listaOriginal})
        Notificacao.exibe('Ops..', 'Algo deu errado!')
      });
  }

  adicionaComentario(idFoto, valorComentario, inputComentario) {
    if(valorComentario === '')
      return;

    const foto = this.buscaPorId(idFoto);
    const comentario = {
      texto: valorComentario
    };

    InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        }

        this.atualizaFotos(fotoAtualizada);
        inputComentario.clear();
      })
      .catch(e => Notificacao.exibe('Ops!', 'Não foi possível adicionar comentario.'));
  }

  verPerfilUsuario(idFoto) {
    const foto = this.buscaPorId(idFoto);

    this.props.navigator.push({
      screen: 'PerfilUsuario',
      backButtonTitle: '',
      title: foto.loginUsuario,
      passProps: {
        usuario: foto.loginUsuario,
        fotoDePerfil: foto.urlPerfil,
      }
    })
  }

  exibeHeader() {
    if(this.props.usuario) {
      return <HeaderUsuario {...this.props} posts={this.state.fotos.length}/>
    }
  }

  render() {
    if(this.state.status === 'FALHA_CARREGAMENTO')
      return (
          <TouchableOpacity style={styles.container} onPress={this.load.bind(this)}>
            <Text style={[styles.texto, styles.titulo]}>Ops..</Text>
            <Text style={styles.texto}>Não foi possível carregar o feed</Text>
            <Text style={styles.texto}>Toque para tentar novamente</Text>
          </TouchableOpacity>
      );

    return (
      <ScrollView>
        {this.exibeHeader()}
        <FlatList
            keyExtractor={item => item.id}
            data={this.state.fotos}
            renderItem={ ({item}) =>
              <Post foto={item}
                  likeCallback={this.like.bind(this)}
                  comentarioCallback={this.adicionaComentario.bind(this)}
                  verPerfilCallback={this.verPerfilUsuario.bind(this)}/>
            }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 20,
    color: '#7f8c8d',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
  }
});
