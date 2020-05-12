namespace Domain
{
    public class PropertyFeature
    {
        public string PropertyId { get; set; }
        public int FeatureId { get; set; }

        public virtual Property Property { get; set; }
        public virtual Feature Feature { get; set; }
    }
}
