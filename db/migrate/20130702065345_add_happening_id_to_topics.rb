class AddHappeningIdToTopics < ActiveRecord::Migration
  def up
    add_column :topics, :happening_id, :integer
  end

  def down
    remove_column :topics, :happening_id
  end


end
