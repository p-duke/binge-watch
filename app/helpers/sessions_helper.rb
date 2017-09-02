module SessionsHelper

  def log_in(user)
    session[:user_id] = user.id
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def logged_in?
    !current_user.nil?
  end

  def log_out
    session.delete(params[:session][:id])
    @current_user = nil
  end

  def log_errors(user)
    data = {}
    if user.nil?
      data = { password: "is not valid", email: "Email doesn't exist" }
    elsif !user.valid_password?(params[:password])
      data = { password: "is not valid" }
    else
      data = { email: "does not exist" }
    end
  end
end
