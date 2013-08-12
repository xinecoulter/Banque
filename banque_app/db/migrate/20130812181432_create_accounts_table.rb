class CreateAccountsTable < ActiveRecord::Migration
  def up
    create_table :accounts do |t|
      t.string :name
      t.float :balance
      t.timestamps
    end
  end

  def down
    drop_table :accounts
  end
end
