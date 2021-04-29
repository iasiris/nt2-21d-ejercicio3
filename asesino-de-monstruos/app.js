new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego=true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos.length = 0
        },
        atacar: function () {
            // random entre 3 y 10
            var danio = this.calcularHeridas(3,10);
            this.saludMonstruo -= danio;
            this.turnos.unshift({
                esJugador: true,
                text :'El jugador golpeo al monstruo con ' + danio + ' pts de daño'
            })
            if (this.verificarGanador()) {return;}
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var danio = this.calcularHeridas(10,20);
            this.saludMonstruo -= danio;
            if (this.verificarGanador()) {return;}
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador <= 90){
                this.saludJugador += 10;
            } else {
                this.saludJugador = 100;
            }
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
            this.turnos.length = 0
        },

        ataqueDelMonstruo: function () {
            // random entre 5 y 12
            var danio = this.calcularHeridas(5,12);
            this.saludJugador -= danio;
            this.turnos.unshift({
                esJugador: true,
                text :'El monstruo golpeo al jugador con ' + danio + ' pts de daño'
            })
            this.verificarGanador();
        },

        calcularHeridas: function (min,max) {
            return Math.max(Math.floor(Math.random()*max) + 1, min);

        },
        verificarGanador: function () {
            if (this.saludMonstruo <= 0 ){
                if(confirm('Ganaste! :D')){
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } else if (this.saludJugador <= 0){
                if(confirm('Perdiste! :( ')){
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});