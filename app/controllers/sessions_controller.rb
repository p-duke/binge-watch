class SessionsController < Devise::SessionsController
  include SessionsHelper
  respond_to :json

  # GET /users/sign_in
  def new
    render file: 'app/views/layouts/application.html.erb'
  end

  # POST /users/sign_in
  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    if @user && @user.authenticate(params[:session])
      log_in(@user)
      render json: { id: @user.id, username: @user.username, email: @user.email }
    else
      data = log_errors(@user)
      render json: data, status: :unauthorized
    end
  end

  # DELETE /users/sign_out
  def destroy
    log_out
    render json: { message: 'Logged out successfully' }
  end

  private

  def verify_signed_out_user
  end

end
