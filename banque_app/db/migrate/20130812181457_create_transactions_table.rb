class CreateTransactionsTable < ActiveRecord::Migration
  def up
    create_table :transactions do |t|
      t.date :date
      t.string :type
      t.float :amount
      t.string :memo
      t.references :account
      t.timestamps
    end
  end

  def down
    drop_table :transactions
  end
end
