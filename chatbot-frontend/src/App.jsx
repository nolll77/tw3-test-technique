import React from 'react'
import './App.css'

function App() {
  // Variables pour stocker les messages et l'input
  const [messages, setMessages] = React.useState([])
  const [inputText, setInputText] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // Fonction pour envoyer un message
  function handleSendMessage() {
    if (inputText === '') {
      return
    }

    // Ajouter le message de l'utilisateur
    const userMessage = {
      text: inputText,
      isUser: true,
      id: Date.now()
    }
    
    setMessages(messages.concat(userMessage))
    
    const questionToSend = inputText
    setInputText('')
    setLoading(true)

    // Envoyer la requête au serveur
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: questionToSend
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      // Ajouter la réponse du bot
      const botMessage = {
        text: data.response,
        isUser: false,
        sources: data.sources,
        id: Date.now() + 1
      }
      
      setMessages(function(oldMessages) {
        return oldMessages.concat(botMessage)
      })
      setLoading(false)
    })
    .catch(function(error) {
      console.log('Erreur:', error)
      const errorMessage = {
        text: 'Désolé, il y a eu une erreur.',
        isUser: false,
        id: Date.now() + 1
      }
      setMessages(function(oldMessages) {
        return oldMessages.concat(errorMessage)
      })
      setLoading(false)
    })
  }

  // Fonction pour gérer l'appui sur Entrée
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  // Fonction pour changer le texte de l'input
  function handleInputChange(event) {
    setInputText(event.target.value)
  }

  return (
    <div className="container">
      <h1>TW3 Chatbot</h1>
      
      {/* Zone des messages */}
      <div className="chat-box">
        {messages.map(function(message) {
          return (
            <div key={message.id}>
              {message.isUser ? (
                <div className="message-user">
                  <strong>Vous:</strong> {message.text}
                </div>
              ) : (
                <div className="message-bot">
                  <strong>Bot:</strong> {message.text}
                  {message.sources && message.sources.length > 0 && (
                    <div className="sources-list">
                      <p><em>Sources:</em></p>
                      {message.sources.map(function(source, index) {
                        return (
                          <div key={index}>
                            <a href={source.url} target="_blank">
                              {source.title}
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
        
        {loading && (
          <div className="message-bot">
            <strong>Bot:</strong> <em>Je cherche une réponse...</em>
          </div>
        )}
      </div>
      
      {/* Zone de saisie */}
      <div className="input-section">
        <input 
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Tapez votre question ici..."
          disabled={loading}
        />
        <button onClick={handleSendMessage} disabled={loading}>
          Envoyer
        </button>
      </div>
    </div>
  )
}

export default App

