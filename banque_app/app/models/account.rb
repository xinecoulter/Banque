class Account < ActiveRecord::Base
  has_many :transactions

  attr_accessible :name, :balance
end