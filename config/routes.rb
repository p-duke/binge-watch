Rails.application.routes.draw do
  root to: "home#index"
<<<<<<< HEAD
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}

  resources :users do
    resources :movies
  end
=======
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations', passwords: 'passwords' }
>>>>>>> WIP
end
