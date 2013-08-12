class Transaction < ActiveRecord::Base
  belongs_to :account

  attr_accessible :date, :type, :amount, :memo
end