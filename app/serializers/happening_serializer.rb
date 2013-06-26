class HappeningSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :start_slot, :when, :end_slot, :address, :coordinates, :meta, :json_details, :source
end
