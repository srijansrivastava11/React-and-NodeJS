export const fetchLogIn = (username, password=null) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({
            username,
            password
        }),
    })
        .catch(() => {
            return Promise.reject({
                code: 'network-error'
            });
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};

export const fetchLoginStatus = () => {
    return fetch('/session', {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({
                code: 'network-error'
            });
        })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject({
                    code: 'login-invalid'
                });
            }
            return response.json();
        });
};

export const fetchLogOut = () => {
    return fetch('/session', {
        method: 'DELETE'
    })
        .catch(() => {
            return Promise.reject({
                code: 'network-error'
            });
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};

export const sendContact = (contactInfo) => {
    return fetch('/contactDetails', {
        method: 'POST',
        body: JSON.stringify({
            'contactInfo': contactInfo
        }),
        headers: new Headers({
            'content-type': 'application/json'
        })
    })
        .catch(() => Promise.reject({
            error: 'network-error'
        }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};

export const fetchContacts = () => {
    return fetch('/contactDetails', {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({
                code: 'network-error'
            });
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });

};

export const deleteContact = (id) => {
  return fetch(`/contactDetails/${id}`, {
    method: 'DELETE',
  })
  .catch(() => Promise.reject({
      error: 'network-error'
  }))
  .then( response => {
    return response.ok;
  });
};
