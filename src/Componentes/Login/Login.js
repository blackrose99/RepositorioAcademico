import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';

function Login() {
  const [isStudent, setIsStudent] = useState(true);

  // Define la animación de entrada/salida
  const transitions = useTransition(isStudent, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div>
      <h2>Login</h2>
      <label>
        <input
          type="radio"
          name="userType"
          value="student"
          checked={isStudent}
          onChange={() => setIsStudent(true)}
        />
        Estudiante
      </label>
      <label>
        <input
          type="radio"
          name="userType"
          value="teacher"
          checked={!isStudent}
          onChange={() => setIsStudent(false)}
        />
        Docente
      </label>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div key={key} style={props}>
            {/* Contenido para estudiantes */}
            <p>Contenido para estudiantes</p>
          </animated.div>
        ) : (
          <animated.div key={key} style={props}>
            {/* Contenido para docentes */}
            <p>Contenido para docentes</p>
          </animated.div>
        )
      )}
    </div>
  );
}

export default Login;
