class MoviesController < ApplicationController
  respond_to :json

  def index
    user = User.find(params[:user_id])
    movies = user.movies
    data = { movies: movies }
    render json: data, status: 200
  end

  def create
    user = User.find(params[:user_id])
    movie = user.movies.new(movie_params)

    if user && movie.save
      data = { id: movie.id, title: movie.title, overview: movie.overview, release_date: movie.release_date, user_id: movie.user_id }
      render json: data
    else
      data = { errors: movie.errors.messages }
      render json: data, status: 422
    end
  end

  def destroy
    Movie.includes(:user).where(user_id: params[:user_id], id: params[:id]).first.destroy
  end

  def render_application_layout
    render file: 'app/views/layouts/application.html.erb'
  end


  private

  def movie_params
    params.require(:movie).permit(:title, :overview, :release_date, :poster_path, :user_id)
  end
end
