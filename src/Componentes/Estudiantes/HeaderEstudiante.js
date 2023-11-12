// como hacer un componete en react para mostrar el Header de un Estudiante y que este le de la bienevenida?
import React from 'react';

class StudentHeader extends React.Component {
    render() {
        const date = new Date();
        const hour = date.getHours();
        let welcomeMessage = '';

        if (hour < 12) {
            welcomeMessage = 'Buenos días';
        } else if (hour < 18) {
            welcomeMessage = 'Buenas tardes';
        } else {
            welcomeMessage = 'Buenas noches';
        }

        return (
            <header>
                <h1>{welcomeMessage} Estudiante</h1>
            </header>
        );
    }
}

export default StudentHeader;