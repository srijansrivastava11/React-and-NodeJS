const convertNetworkError = (err) => {
    return {
      code: 'NETWORK-ERROR',
      err
    };
  };
  
  const convertServiceError = (err) => Promise.reject(err);
  
  export const fetchLoginStatus = (username) => {
    return fetch('/session', {
      method: 'GET',
    })
    .catch( convertNetworkError )
    .then( response => {
      if(!response.ok) {
       
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
  };

  
  export const fetchDeleteTasks = (username) => {
    return fetch(`/tasks/${username}`, {
      method: 'DELETE',
    })
    .catch( convertNetworkError)
    .then( response => {

      return response.ok;
    });
  };

  export const fetchDeleteTask = (username, taskId) => {
    return fetch(`/tasks/${username}/${taskId}`, {
      method: 'DELETE',
    })
    .catch( convertNetworkError)
    .then( response => {
        return response.ok;
    });
  };


  export const fetchTasks = () => {
    return fetch('/items', {
      method: 'GET',
    })
    .catch( convertNetworkError )
    .then( response => {
      if(!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
  };

  export const fetchGetTask = (username) => {
    return fetch(`/tasks/${username}`, {
      method: 'GET',
    })
    .catch( convertNetworkError )
    .then( response => {
      if(!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
  };

  export const fetchPostTask = (username,task) => {
    return fetch(`/tasks/${username}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({task}),
    })
    .catch( convertNetworkError )
    .then( response => {
      if(!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
  };

  export const fetchUpdateTheme = (username,theme) => {
    return fetch(`/theme/${username}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({theme}),
    })
    .catch( convertNetworkError )
    .then( response => {
      if(!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
  };

  export const fetchEditTask = (username,task) => {
    return fetch(`/tasks/${username}/${task.taskId}`, {
      method: 'PUT',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ task}),
    })
    .catch( convertNetworkError )
    .then( response => {
      if(!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
  };
  
  export const fetchLogin = (username) => {
    return fetch('/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ username }),
    })
    .catch( convertNetworkError )
    .then( response => {
      if(!response.ok) {
        return response.json().then( convertServiceError );
      }
      return response.json();
    });
  };

  export const fetchLogout = () => {
    return fetch('/session', {
      method: 'DELETE',
    })
    .catch( convertNetworkError)
    .then( response => {

      return response.ok;
    });
  };