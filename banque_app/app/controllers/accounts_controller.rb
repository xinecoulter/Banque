class AccountsController < ActionController::Base
  # This line shouldn't be needed
  layout 'application'

  def index
    @accounts = Account.all
    respond_to do |format|
      format.html
      format.json { render json: @accounts }
    end
  end

  def create
    @account = Account.new(name: params[:accountName], balance: params[:startingBalance])
    @account.save
    respond_to do |format|
      format.json { render json: @account }
    end
  end

  def update
    @account = Account.find(params[:id])
    @account.balance = params[:balance]
    @account.save
    respond_to do |format|
      format.js {}
    end
  end

end