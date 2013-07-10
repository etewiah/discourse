class HappeningSerializer < ActiveModel::Serializer
	embed :ids, include: true

  has_many :topics, key: :happening_topic_ids, root: :happening_topics, serializer: HappeningTopicSerializer

  attributes :id, :title, :description, :start_slot, :when, :end_slot, :address, :coordinates, :meta, :json_details, :source, :city
end
